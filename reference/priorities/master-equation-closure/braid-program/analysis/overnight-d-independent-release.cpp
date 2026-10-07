// Independent research approximation: projected midpoint velocities and quadratic
// position history with linearly interpolated, speed-bounded endpoint velocities.
// No production solver or exact-trajectory certificate.
#include <array>
#include <vector>
#include <cmath>
#include <algorithm>
#include <fstream>
#include <iostream>
#include <iomanip>
#include <chrono>
#include <stdexcept>
using V=std::array<double,3>;
V operator+(V a,V b){for(int k=0;k<3;k++)a[k]+=b[k];return a;}
V operator-(V a,V b){for(int k=0;k<3;k++)a[k]-=b[k];return a;}
V operator*(double c,V a){for(double &v:a)v*=c;return a;}
double dot(V a,V b){double s=0;for(int k=0;k<3;k++)s+=a[k]*b[k];return s;}
double norm(V a){return std::sqrt(dot(a,a));}
V project(V a){double n=norm(a);return n>1?(1/n)*a:a;}
V effective(V a,V v){double speed=norm(v);if(speed>=1-1e-12){V e=(1/speed)*v;double f=dot(e,a);if(f>0)a=a-f*e;}return a;}
struct Node{double t;std::vector<V>x,v;};
struct Solver {
 int N;double w,P,size,h0,dtmin=1.,maxspeed=0.;
 std::vector<double>r,phi,z,pol;std::vector<Node>nodes;std::vector<double>guess;
 Solver(int n):N(n),r(n),phi(n),z(n),pol(n),guess(n*n,1.){}
 std::pair<V,V> past(int j,double t)const{double a=phi[j]+w*t;return {{r[j]*std::cos(a),r[j]*std::sin(a),z[j]},{-w*r[j]*std::sin(a),w*r[j]*std::cos(a),0.}};}
 void init(std::vector<V>kick,double divisor){P=2*std::acos(-1.)/std::abs(w);h0=P/divisor;size=*std::max_element(r.begin(),r.end());Node a; a.t=0;for(int i=0;i<N;i++){auto q=past(i,0);a.x.push_back(q.first);a.v.push_back(q.second+kick[i]);if(norm(a.v.back())>1+1e-12)throw std::runtime_error("initial speed outside cap");}nodes.push_back(a);}
 std::pair<V,V> hist(int j,double t)const{
  if(t<=0)return past(j,t);
  if(t>nodes.back().t+1e-12)throw std::runtime_error("future source request");
  auto it=std::upper_bound(nodes.begin(),nodes.end(),t,[](double q,const Node&n){return q<n.t;});
  size_t k=it-nodes.begin();k=k? k-1:0;if(k>=nodes.size()-1)k=nodes.size()-2;
  double q=(t-nodes[k].t)/(nodes[k+1].t-nodes[k].t),dt=t-nodes[k].t;
  V change=nodes[k+1].v[j]-nodes[k].v[j];
  return {nodes[k].x[j]+dt*nodes[k].v[j]+(.5*dt*q)*change,nodes[k].v[j]+q*change};
 }
 struct Row{V a;double tau,Dt;};
 Row row(double t,V receiver,int i,int j){
  auto eval=[&](double tau){auto h=hist(j,t-tau);V d=receiver-h.first;double len=norm(d);if(len==0)throw std::runtime_error("zero delayed range");V n=(1/len)*d;return std::pair<double,double>{tau-len,1-dot(n,h.second)};};
  double lo=std::max(0.,t-nodes.back().t),hi=std::max(guess[i*N+j]*1.5,lo+1.);
  if(lo>0 && eval(lo).first>0)throw std::runtime_error("future source request");
  while(eval(hi).first<0){hi*=2;if(hi>1e12)throw std::runtime_error("unbounded root bracket");}
  double q=std::min(hi,std::max(lo,guess[i*N+j]));
  for(int k=0;k<100;k++){
   auto e=eval(q);if(e.first>0)hi=q;else lo=q;
   if(std::abs(e.first)<2e-13*std::max(1.,q))break;
   double next=q-e.first/e.second;if(e.second<=1e-10||!std::isfinite(next)||next<=lo||next>=hi)next=(lo+hi)/2;q=next;
   if(k==99)throw std::runtime_error("root iteration limit");
  }
  auto h=hist(j,t-q);V d=receiver-h.first;double len=norm(d);V n=(1/len)*d;double D=1-dot(n,h.second);
  if(D<1e-9)throw std::runtime_error("nonordinary factor");guess[i*N+j]=q;dtmin=std::min(dtmin,D);
  return {(pol[i]*pol[j]/(q*q*D))*n,q,D};
 }
 std::vector<V> accel(double t,const std::vector<V>&x){std::vector<V>a(N,V{0,0,0});for(int i=0;i<N;i++)for(int j=0;j<N;j++)if(i!=j)a[i]=a[i]+row(t,x[i],i,j).a;return a;}
 std::pair<double,double> distances()const{double lo=1e300,hi=0;auto &x=nodes.back().x;for(int i=0;i<N;i++)for(int j=0;j<i;j++){double d=norm(x[i]-x[j]);lo=std::min(lo,d);hi=std::max(hi,d);}return {lo,hi};}
 void step(){
  // Values copied because vector growth invalidates references.
  Node a=nodes.back();auto A=accel(a.t,a.x);double h=std::min(h0,.0025*distances().first);double tau=1e300;
  for(int i=0;i<N;i++)for(int j=0;j<N;j++)if(i!=j)tau=std::min(tau,guess[i*N+j]);h=std::min(h,.1*tau);
  for(int i=0;i<N;i++)if(norm(a.v[i])>.999999)h=std::min(h,.08/std::max(norm(A[i]),1e-30));
  if(h<1e-13*P)throw std::runtime_error("step floor");
  std::vector<V>midv(N),midx(N);for(int i=0;i<N;i++){midv[i]=project(a.v[i]+(.5*h)*effective(A[i],a.v[i]));midx[i]=a.x[i]+(.5*h)*a.v[i];}
  auto B=accel(a.t+.5*h,midx);Node next;next.t=a.t+h;
  for(int i=0;i<N;i++){next.v.push_back(project(a.v[i]+h*effective(B[i],midv[i])));next.x.push_back(a.x[i]+(.5*h)*(a.v[i]+next.v.back()));maxspeed=std::max(maxspeed,norm(next.v.back()));}
  nodes.push_back(next);
 }
 void output(std::ostream&o,const std::string&event){auto &a=nodes.back();o<<std::setprecision(17)<<"{\"event\":\""<<event<<"\",\"t\":"<<a.t<<",\"t_over_P\":"<<a.t/P<<",\"steps\":"<<nodes.size()<<",\"Dmin\":"<<dtmin<<",\"max_segment_speed\":"<<maxspeed<<",\"X\":[";for(int i=0;i<N;i++){if(i)o<<',';o<<'['<<a.x[i][0]<<','<<a.x[i][1]<<','<<a.x[i][2]<<']';}o<<"],\"V\":[";for(int i=0;i<N;i++){if(i)o<<',';o<<'['<<a.v[i][0]<<','<<a.v[i][1]<<','<<a.v[i][2]<<']';}o<<"]}\n";}
};
void controls(){
 Solver S(2);S.w=0;S.r={3,0};S.phi={0,0};S.z={0,0};S.pol={1,-1};Node n;n.t=0;S.nodes.push_back(n);auto a=S.row(0,{3,0,0},0,1);if(std::abs(a.tau-3)>1e-11||norm(a.a-V{-1./9,0,0})>1e-11)throw std::runtime_error("static control failed");
 double D=.7;for(int k=0;k<50;k++)D-=(D-std::cos(D))/(1+std::sin(D));double R=1/(4*std::cos(D)*(1+std::sin(D)));
 for(int div:{4000,8000}){Solver C(2);C.w=1/R;C.r={R,R};C.phi={0,std::acos(-1.)};C.z={0,0};C.pol={1,-1};C.init(std::vector<V>(2,V{0,0,0}),div);auto A=C.accel(0,C.nodes[0].x);double f=std::sin(D)/(4*R*R*std::cos(D)*std::cos(D)*(1+std::sin(D)));if(norm(A[0]-V{-1/R,f,0})>1e-10)throw std::runtime_error("circular kernel control failed");while(C.nodes.back().t<C.P/4)C.step();double dev=0;for(int i=0;i<2;i++)dev=std::max(dev,norm(C.nodes.back().x[i]-C.past(i,C.nodes.back().t).first)/R);std::cerr<<"circle hdiv "<<div<<" deviation "<<dev<<"\n";if(dev>1e-4)throw std::runtime_error("circular evolution control failed");std::cout<<std::setprecision(17)<<"{\"control\":\"circle\",\"hdiv\":"<<div<<",\"deviation\":"<<dev<<",\"status\":\"PASS\"}\n";}
 V v={.5,0,0};for(int k=0;k<1250;k++)v=project(v+V{k<1000?.001:-.001,0,0});if(std::abs(v[0]-.75)>1e-12)throw std::runtime_error("supplied switching control failed");std::cout<<"{\"control\":\"static root and supplied switching\",\"status\":\"PASS\"}\n";
}
int main(int argc,char**argv){try{
 if(argc==2&&std::string(argv[1])=="controls"){controls();return 0;}
 if(argc!=5)throw std::runtime_error("usage: input hdiv wall_seconds output");
 std::ifstream in(argv[1]);int N;double w;in>>N>>w;Solver S(N);S.w=w;std::vector<V>kick(N);for(int i=0;i<N;i++)in>>S.r[i]>>S.phi[i]>>S.z[i]>>S.pol[i]>>kick[i][0]>>kick[i][1]>>kick[i][2];if(!in)throw std::runtime_error("input parse");S.init(kick,std::stod(argv[2]));
 auto start=std::chrono::steady_clock::now(),last=start;std::string event="end";double wallmax=std::stod(argv[3]);
 while(S.nodes.back().t<10*S.P){S.step();auto d=S.distances();if(d.first<.001*S.size){event="contact-threshold";break;}if(d.second>40*S.size){event="far-threshold";break;}auto now=std::chrono::steady_clock::now();double wall=std::chrono::duration<double>(now-start).count();if(std::chrono::duration<double>(now-last).count()>15){std::cout<<"{\"progress\":true,\"steps\":"<<S.nodes.size()<<",\"t_over_P\":"<<S.nodes.back().t/S.P<<",\"wall\":"<<wall<<"}\n"<<std::flush;last=now;}if(wall>wallmax){event="wall";break;}if(S.nodes.size()>1000000){event="node-limit";break;}}
 std::ofstream out(argv[4]);S.output(out,event);S.output(std::cout,event);
 }catch(const std::exception&e){std::cerr<<e.what()<<'\n';return 1;} }
