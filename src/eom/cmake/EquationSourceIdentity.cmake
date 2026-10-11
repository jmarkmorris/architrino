# Descriptive source/configuration receipt, not an executable binary hash.
# Generated output is excluded from the source inventory it identifies.
file(GLOB_RECURSE EOM_IDENTITY_INPUTS CONFIGURE_DEPENDS
  "${CMAKE_CURRENT_SOURCE_DIR}/include/*.hpp"
  "${CMAKE_CURRENT_SOURCE_DIR}/src/*.cpp"
  "${CMAKE_CURRENT_SOURCE_DIR}/src/*.hpp"
  "${CMAKE_CURRENT_SOURCE_DIR}/native/*.cpp"
  "${CMAKE_CURRENT_SOURCE_DIR}/cmake/*.cmake"
)
list(APPEND EOM_IDENTITY_INPUTS "${CMAKE_CURRENT_SOURCE_DIR}/CMakeLists.txt")
list(SORT EOM_IDENTITY_INPUTS)
set(EOM_SOURCE_PREIMAGE "eom-compiled-source/v1\n")
foreach(EOM_IDENTITY_INPUT IN LISTS EOM_IDENTITY_INPUTS)
  file(RELATIVE_PATH EOM_IDENTITY_PATH
    "${CMAKE_CURRENT_SOURCE_DIR}" "${EOM_IDENTITY_INPUT}")
  file(SHA256 "${EOM_IDENTITY_INPUT}" EOM_IDENTITY_SHA)
  string(APPEND EOM_SOURCE_PREIMAGE "${EOM_IDENTITY_PATH}|${EOM_IDENTITY_SHA}\n")
endforeach()
string(SHA256 EOM_SOURCE_DIGEST "${EOM_SOURCE_PREIMAGE}")
set(EOM_BINDING_SOURCE
  "${CMAKE_CURRENT_SOURCE_DIR}/../../reference/priorities/app-solver/contracts/master-eom-binding-v1.md")
set(EOM_SURFACE_SOURCE
  "${CMAKE_CURRENT_SOURCE_DIR}/../../reference/priorities/master-equation-closure/equation-variants/surface-constraint/definition.md")
file(SHA256 "${EOM_BINDING_SOURCE}" EOM_CANONICAL_DEFINITION_DIGEST)
file(SHA256 "${EOM_SURFACE_SOURCE}" EOM_SURFACE_DEFINITION_DIGEST)
find_path(EOM_GMP_INCLUDE_DIR gmp.h HINTS "${MPFR_INCLUDE_DIR}" REQUIRED)
file(SHA256 "${MPFR_LIBRARY}" EOM_MPFR_LIBRARY_DIGEST)
file(SHA256 "${GMP_LIBRARY}" EOM_GMP_LIBRARY_DIGEST)
file(SHA256 "${MPFR_INCLUDE_DIR}/mpfr.h" EOM_MPFR_HEADER_DIGEST)
file(SHA256 "${EOM_GMP_INCLUDE_DIR}/gmp.h" EOM_GMP_HEADER_DIGEST)
file(SHA256 "${CMAKE_CXX_COMPILER}" EOM_COMPILER_DIGEST)
set_property(DIRECTORY APPEND PROPERTY CMAKE_CONFIGURE_DEPENDS
  ${EOM_IDENTITY_INPUTS} "${EOM_BINDING_SOURCE}" "${EOM_SURFACE_SOURCE}"
  "${MPFR_LIBRARY}" "${GMP_LIBRARY}" "${MPFR_INCLUDE_DIR}/mpfr.h"
  "${EOM_GMP_INCLUDE_DIR}/gmp.h" "${CMAKE_CXX_COMPILER}")
file(MAKE_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/generated")
file(WRITE "${CMAKE_CURRENT_BINARY_DIR}/generated/equation-source-identity.inputs"
  "${EOM_SOURCE_PREIMAGE}")
if(CMAKE_CONFIGURATION_TYPES)
  set(EOM_IDENTITY_CONFIGS ${CMAKE_CONFIGURATION_TYPES})
  set(EOM_IDENTITY_INCLUDE_DIR "${CMAKE_CURRENT_BINARY_DIR}/generated/$<CONFIG>")
else()
  set(EOM_IDENTITY_CONFIGS single)
  set(EOM_IDENTITY_INCLUDE_DIR "${CMAKE_CURRENT_BINARY_DIR}/generated")
endif()
foreach(EOM_IDENTITY_CONFIG IN LISTS EOM_IDENTITY_CONFIGS)
  if(CMAKE_CONFIGURATION_TYPES)
    set(EOM_IDENTITY_BUILD_TYPE "${EOM_IDENTITY_CONFIG}")
    set(EOM_IDENTITY_OUTPUT "${CMAKE_CURRENT_BINARY_DIR}/generated/${EOM_IDENTITY_CONFIG}")
  else()
    set(EOM_IDENTITY_BUILD_TYPE "${CMAKE_BUILD_TYPE}")
    set(EOM_IDENTITY_OUTPUT "${CMAKE_CURRENT_BINARY_DIR}/generated")
  endif()
  string(TOUPPER "${EOM_IDENTITY_BUILD_TYPE}" EOM_BUILD_TYPE_UPPER)
  set(EOM_CONFIG_PREIMAGE
    "eom-build-configuration/v1\ncompiler=${CMAKE_CXX_COMPILER}\ncompilerDigest=${EOM_COMPILER_DIGEST}\ncompilerId=${CMAKE_CXX_COMPILER_ID}\ncompilerVersion=${CMAKE_CXX_COMPILER_VERSION}\ncompilerTarget=${CMAKE_CXX_COMPILER_TARGET}\nstandard=${CMAKE_CXX_STANDARD}\ngenerator=${CMAKE_GENERATOR}\nplatform=${CMAKE_GENERATOR_PLATFORM}\narchitecture=${CMAKE_OSX_ARCHITECTURES}\nsysroot=${CMAKE_OSX_SYSROOT}\ngenericSysroot=${CMAKE_SYSROOT}\ndeploymentTarget=${CMAKE_OSX_DEPLOYMENT_TARGET}\nbuildType=${EOM_IDENTITY_BUILD_TYPE}\nflags=${CMAKE_CXX_FLAGS}\nconfigurationFlags=${CMAKE_CXX_FLAGS_${EOM_BUILD_TYPE_UPPER}}\nlinkerFlags=${CMAKE_EXE_LINKER_FLAGS}\nconfigurationLinkerFlags=${CMAKE_EXE_LINKER_FLAGS_${EOM_BUILD_TYPE_UPPER}}\nsanitizers=${EOM_ENABLE_SANITIZERS}\nmpfr=${EOM_MPFR_LIBRARY_DIGEST}\ngmp=${EOM_GMP_LIBRARY_DIGEST}\nmpfrHeader=${EOM_MPFR_HEADER_DIGEST}\ngmpHeader=${EOM_GMP_HEADER_DIGEST}\n")
  string(SHA256 EOM_CONFIGURATION_DIGEST "${EOM_CONFIG_PREIMAGE}")
  string(SHA256 EOM_BUILD_DIGEST "${EOM_SOURCE_DIGEST}|${EOM_CONFIGURATION_DIGEST}")
  file(MAKE_DIRECTORY "${EOM_IDENTITY_OUTPUT}")
  file(WRITE "${EOM_IDENTITY_OUTPUT}/equation-configuration-identity.inputs"
    "${EOM_CONFIG_PREIMAGE}")
  file(WRITE "${EOM_IDENTITY_OUTPUT}/EquationSourceIdentity.hpp"
    "#pragma once\nnamespace architrino::eom::detail {\ninline constexpr const char* kEquationSourceDigest = \"${EOM_SOURCE_DIGEST}\";\ninline constexpr const char* kEquationConfigurationDigest = \"${EOM_CONFIGURATION_DIGEST}\";\ninline constexpr const char* kEquationBuildDigest = \"${EOM_BUILD_DIGEST}\";\ninline constexpr const char* kCanonicalDefinitionDigest = \"${EOM_CANONICAL_DEFINITION_DIGEST}\";\ninline constexpr const char* kSurfaceDefinitionDigest = \"${EOM_SURFACE_DEFINITION_DIGEST}\";\n}\n")
endforeach()
