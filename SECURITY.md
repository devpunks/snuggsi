# Security Policy

This sofware is guided by [SSDF _(Secure Software Development Framework)_](https://csrc.nist.gov/Projects/ssdf) to the best of it's abilities 

Proving the integrity of your software artifacts is essential, but it is not enough:
although it enables users to trust the artifacts that they consume, it does not provide any trusted context to that artifact.

Please be advised that [these strategies **SHOULD NOT** be an _end-all-solution_](https://caremad.io/posts/2013/07/packaging-signing-not-holy-grail).
Be sure to take further precautions to ensure a level of security that satisfies your needs.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2025.0.0   | :white_check_mark: |
| 2025.1.0   | :white_check_mark: |
| 2024.0.0   | :x: |
| 2024.1.0   | :x: |


A chronological [CalVer](https://calver.org) nightly [Continuous Delivery strategy](.github/workflows/nightly.yml) is used for versioning instead of [Semver](https://semver.org)

[Read More...](./posts/cal-ver.md)

Version generation and Publishing routine [can be found here](https://github.com/devpunks/snuggsi/tree/main/bin#version).

## Artifact Integrity

Artifacts Integrity is about the ability to trust the authenticity of artifacts, meaning verifying that the artifact you get is really the original artifact uploaded by its author.

[Read More...](https://legitsecurity.com/blog/why-you-can-still-get-hacked-even-after-signing-your-software-artifacts)

![basic cosign artifact signing flow diagram v2](https://github.com/user-attachments/assets/05d95c8c-e41c-4174-b555-9dd5caa83b02)


## Software Attestation

This software uses the _"In-Toto"_ 3-step methodology for cryptographically signing artifacts & metadata:

  1. The DSSE Envelope (“Dead Simple Signing Envelope”): the transport layer.
  2. The in-toto Statement: the attestation header.
  3. The predicate: the attestation payload.

[Read More...](https://legitsecurity.com/blog/slsa-provenance-blog-series-part-1-what-is-software-attestation)

![Screen Shot 2025-01-09 at 7 22 03 AM](https://github.com/user-attachments/assets/5e7f7b0c-36ab-4a63-b046-08d33a4df684)


## SBOM _(Software Bill of Materials)_

This software utilizes the SLSA _(Supply-chain Levels for Sofware Artifacts)_](https://slsa.dev/spec/v1.0/about)
to ensure [Provenance](https://csrc.nist.gov/glossary/term/provenance) for Proof-Of-Origin verification prior to usage within sensitive supply-chains.

The [nightly build process](.github/workflows/nightly.yml) provides an automated artifact generation.
Thus allowing verification of a software application's authenticity and integrity 
(i.e., that the developers are who they claim to be and that the software has not been tampered with after release).


## Reporting a Vulnerability

Contanct us if anything seems janky in regards to **security vulnerabilities**.

You can also check the [Dependabot updates](https://github.com/devpunks/snuggsi/security/dependabot) section for existing vulnerability corrections.

## Attack Vectors

![Screen Shot 2023-05-03 at 3 38 49 PM](https://github.com/user-attachments/assets/d7c86857-0166-44f8-aae8-7691942310a7)
