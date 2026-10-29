# Orchestration process specification — v1

The authoritative specification of how orchestrated development runs
on majodali portfolio projects. The plugin and any orchestration
tooling are built artifacts implementing this spec
([methodology Constitution, Article 3](https://github.com/majodali/methodology/blob/v1.3.0/docs/constitution.md#article-3--authority)).

Normative keywords MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are
used per BCP 14, following the methodology's convention.

**Subordination.** This specification refines the methodology; it
never overrides it. Where the two conflict, the methodology is right
and this spec has a defect: record it, fix it, and where the friction
is real, propose an amendment upstream
([Article 8](https://github.com/majodali/methodology/blob/v1.3.0/docs/constitution.md#article-8--amendments-versions-and-migration)).
Every orchestrated action on a managed project complies with that
project's own compliance target.

Reader: RD-4 in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers) (a fresh agent
session): any session learning or applying the process. It assumes
the methodology at this project's pinned version, 1.6.0
([Classification](../classification.md)); the terms the process adds
are defined below.

## Defined terms

- **Managed project** — a portfolio project enrolled for
  orchestration: its Classification's Custom definitions section
  defines the *Plan register* and *Cost log* types (citing this
  spec), and a Plan register exists. Enrollment is an owner decision.
- <a id="def-node"></a>**Node** — one unit of work at any level of a managed project's
  plan hierarchy ([plan-model.md](plan-model.md)).
- <a id="def-task"></a>**Task** — one dispatched role invocation: a (node, stage, role,
  context packet) tuple ([dispatch.md](dispatch.md)).
- **Approved scope** — the set of nodes and stages the human owner
  has authorized for dispatch at a gate; the boundary of autonomous
  orchestration ([dispatch.md](dispatch.md)).

## Documents

Reading order for a session learning the process:

1. [plan-model.md](plan-model.md) — the plan hierarchy, the node
   lifecycle, and the relationship to the methodology's Backlog.
2. [plan-register.md](plan-register.md) — the Plan register document
   type: format and maintenance rules.
3. [dispatch.md](dispatch.md) — the orchestration loop: dispatch
   rules, judgment routing, handoff contracts, context packets,
   trigger surfaces, and gates.
4. [roles.md](roles.md) — the role contracts and the model-tier
   mapping, in one place.
5. [profiles.md](profiles.md) — which of the above applies at each
   C-tier.
6. [cost-log.md](cost-log.md) — the Cost log document type: what
   every task records.
7. [auditing.md](auditing.md) — how the orchestration artifacts are
   audited: machine form checks, agent semantic checks.
8. [observability.md](observability.md) — the run journal: the
   operational feed for troubleshooting and optimization.
9. [rulings.md](rulings.md) — the Ruling register: gate decisions
   captured as precedents, applied to staged questions, promoted
   into this spec when patterns recur.
10. [enlistment.md](enlistment.md) — enlisting a repository against a
    deployed orchestration service instance (optional; the process
    above is unchanged where none is enlisted or it is unreachable).

Known failure modes of the process and their containment are
registered in the project's [Risk register](../open-risks.md).

## Roles

The role set — Orchestrator · Planner · Implementer · Reviewer ·
Auditor · Liaison · Paraphraser · Reviewer (stranger), refinements of
the methodology's
Agent/Reviewer/Auditor with the Human owner unchanged — is defined
in [roles.md](roles.md),
together with each role's authority bounds and the model-tier
mapping. How roles are prompted and provisioned is plugin material
(plan chunk 4).

## How far the prose rules reach

The methodology's [prose rules](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/prose.md),
the P- series, bind this project's artifacts by class
([plan for P1-N014 (role contracts adopt the methodology's conduct rules)](../plans/p1-n014-role-contracts-adopt-v140-rules.md),
decision 7: how far the prose rules reach). Each class below names
what binds it.

- Documents under `docs/` are fully bound, in new and edited prose.
  A document gains its reader statement under
  [P-007 (documents state their reader)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/prose.md#p-007--documents-state-their-reader)
  at its next edit. A term with a project-specific meaning links its
  definition site at first use under
  [P-008 (terms are defined once and linked at first use)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/prose.md#p-008--terms-are-defined-once-and-linked-at-first-use).
- [Task](#def-task) briefs, task results and gate summaries are bound
  absolutely by [P-004 (citations carry names)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/prose.md#p-004--citations-carry-names):
  every identifier they cite carries its name. The other P- rules bind
  them as they fit.
- Commit messages are bound by
  [P-004 (citations carry names)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/prose.md#p-004--citations-carry-names)
  only.
- Role contracts in `.claude/agents/` and their mirrors in
  `plugin/agents/` are bound as briefs are.
- The run journal and code, code comments included, are exempt.
