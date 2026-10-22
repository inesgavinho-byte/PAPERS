# pink_moustache · Engineering Standard v0.1

> Independent thinking. Verifiable engineering.

**Status:** pilot / proposed. **Scope:** PAPERS repository only.  
**Identity:** pink_moustache, by Inês Gavinho.  
**Not a third-party security certification.**

## Principles
1. **Clarity over complexity.** Prefer the smallest maintainable solution.
2. **Build once, improve everywhere — deliberately.** Reuse only when contracts and ownership are clear.
3. **Human intention, machine execution.** Agents may implement, but human owners approve risk, scope, and deployment.
4. **Evidence before confidence.** State what was tested, where, and against which revision.
5. **Designed to evolve.** Changes must remain understandable, observable and reversible.

## Development contract
Before editing: define objective, boundaries, impacted files and acceptance criteria.  
During implementation: avoid unrelated changes, protect private data, document material architectural decisions.  
Before review: inspect diff, run checks appropriate to change, report results and limitations.  
Before deployment: obtain authorization, identify rollback, review environment and configuration impacts.

## Provenance and attribution
"pink_moustache / authored" is a declaration of authorized creative/technical direction, **not** a claim that all lines were personally typed by one individual. Credit other contributors and disclose relevant AI assistance where appropriate. Never place brand notices on client-owned work without authorization.

## Verification
"PM / Verified" applies only to a specific commit SHA after mandatory checks have passed, security/privacy review has been completed, and a human has approved the recorded evidence. Missing evidence means **Review Required**.

### PAPERS pilot gate
- Dependencies install using a committed lockfile.
- Production build passes.
- Internal navigation and critical pages reviewed.
- Broken links and metadata/canonical URLs checked.
- Secrets and personal data exposure assessed.
- Static accessibility checks and responsive manual review recorded.
- Deployment destination and rollback documented.
- Reviewer signs off on an immutable commit SHA.

Do not claim this repository is verified merely because this standard exists.
