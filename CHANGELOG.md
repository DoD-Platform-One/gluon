# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Note that changelog entries are only added when there are changes to the chart (docs changes do not require a new version/changelog entry).

---
## [0.3.2]
### Changed
- Moved cypress image to new location in registry1

## [0.3.1]
### Changed
- fixed cypress and script runner templates to remove extra newlines

## [0.3.0]
### Changed
- Updated test pods to be istio injected and properly terminate sidecars

## [0.2.10]
### Changed
- Updated cypress version to 9.7.0

## [0.2.9]
### Added
- Set security context for test pods (run as non root, drop capabilities)

## [0.2.8]
### Changed
- `mv` cypress artifacts rather than copying them

## [0.2.7]
### Fixed
- Fix conditionals around cypress artifact handling

## [0.2.6]
### Changed
- Change cypress artifacts from using configmaps to use volume mount on host
- Cleaned up a lot of dead code

## [0.2.5]
### Changed
- Ignore plugins file in cypress run command

## [0.2.4]
### Changed
- Updated cypress version to 8.3.1

## [0.2.3]
### Added
- Added ability to specify resources for test pods + add defaults

## [0.2.2]
### Fixed
- Fixed missing istio conditional for `hostAliases`

## [0.2.1]
### Added
- Added `hostAliases` setup for Istio VS

## [0.1.1]
### Changed
- Renamed to gluon, added docs

## [0.1.0]
### Changed
- Initial release of "bb-test-lib" under the gluon repo with CI creation of OCI artifacts
