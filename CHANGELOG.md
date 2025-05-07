# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Note that changelog entries are only added when there are changes to the chart (docs changes do not require a new version/changelog entry).

---

## [0.5.18]

### Changed

- Updated `kubectl` version to `v1.32.4`
- Updated `nginx` version to `1.27.5`

## [0.5.17]

### Changed

- Add service Account functionality to scripts

## [0.5.16]

### Changed

- Add default for waitJob image

## [0.5.15]

### Changed

- Set the wait job image in Gluon rather than in the package

## [0.5.14]

### Changed

- set the following under the wait job  spec.template.spec.containers.securityContext.allowPrivilegeEscalation: false
- updating cypress to 13.17

## [0.5.13]

### Added

- Fixed bug in mac cypress run command and typo

## [0.5.12]

### Added

- Removing the link from the maintenance badge to fix the formatting in GitLab

## [0.5.11]

### Added

- Added the package maintenance badge to the README generator

## [0.5.10]

### Added

- Added support of using regular expressions in the validatePromTarget command

## [0.5.9]

### Added

- Added the ability to provide a custom verb list to the waitjob role

## [0.5.8]

### Added

- Fixing the backward compatibility of cypress logs

## [0.5.7]

### Added

- Fixing the output of cypress logs

## [0.5.6]

### Added

- Fixing the cypress runner for logs

## [0.5.5]

### Added

- Updating cypress version
- Adding the logs for the cypress test to artifacts

## [0.5.4]

### Added

- Updating post-install wait hook
- Fixing Cypress tests

## [0.5.3]

### Added

- update cypress default image

## [0.5.2]

### Added

- Added post-install hook to execute wait script for running pipelines
- Updated post-install hook to pass helm linting

## [0.5.1]

### Changed

- Bumps `helm-docs` image version recommendation from `1.10.0` to `1.14.2`.
- Updated README generation templates under `./docs` to always include an `Upstream Release Notes` section as a part of [renovate-runner#30](https://repo1.dso.mil/big-bang/pipeline-templates/renovate-runner/-/issues/30) under the [automate renovate ticket workflow](https://repo1.dso.mil/groups/big-bang/-/epics/330) epic.

## [0.5.0]

### Changed

- Updated default image, updated necessary logic in cypressrunner, and removed logic that is now already done in container

## [0.4.10]

### Added

- Store cypres test result in persistent volume

## [0.4.9]

### Changed

- Increase default cypress to reduce failures

## [0.4.8]

### Added

- Added ability to disable bb provided cypress tests so users can run only their own provided tests
- Finalized shared commands

## [0.4.7]

### Added

- Shared commands and Cypress config to reduce code duplication across package tests

### Changed

- Updated Gluon to allow the specification of user provided tests
- Increased default memory for cypress pod

## [0.4.6]

### Added

- Start Container in privileged for OpenShift
- Change HostPath for OpenShift

## [0.4.5]

### Fixed

- Fixed bug where pod resources were not setting limits. It was using requets values for both requests and limites.

## [0.4.4]

### Fixed

- Fixed bug where istio sidecar resources were not optional

## [0.4.3]

### Changed

- Allowed ability to optionally override the injected Istio sidecar container resources

## [0.4.2]

### Changed

- Added optional flag bbtests.cypress.enabled to disable cypress tests, defaults to enabled

## [0.4.1]

### Changed

- Reverted current default image and ensured that js is the path forward

## [0.4.0]

### Changed

- Upgraded gluon library

## [0.3.3]

### Changed

- Moved cypress image to new location in registry1

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
