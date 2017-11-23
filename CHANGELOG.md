# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Validator now uses Jest test framework and initial tests
- Support for command line arguments. See `-h` for details
- Default command (or `validate`) now lists invalid versions

### Changed
- Previous default command (no arguments) is moved to `list` command instead

### Fixed
- versions.json being read from the Validator’s root, not project’s root

## [0.0.1] - 2017-11-14
### Added
- Project setup
- Tools: node-hooks, sonar-runner.
- Display list of supported versions

[Unreleased]: https://github.com/pipedrive/node-version-validator/compare/v0.0.1...HEAD