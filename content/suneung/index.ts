import type { SuneungTopic } from "./types";
import subjectVerb from "./subject-verb";
import pronoun from "./pronoun";
import verbVerbal from "./verb-verbal";
import voice from "./voice";
import relativeWhat from "./relative-what";
import adjAdv from "./adj-adv";
import prepConj from "./prep-conj";
import objectComplement from "./object-complement";
import transitive from "./transitive";
import parallel from "./parallel";
import proVerb from "./pro-verb";
import inversion from "./inversion";
import tense from "./tense";
import subjunctive from "./subjunctive";
import modal from "./modal";
import mixed from "./mixed";

/** 수능형 예시 문제 주제. MDX에서 <SuneungSet topic="주제 id" />로 부른다 */
export const suneungTopics: Record<string, SuneungTopic> = Object.fromEntries(
  [subjectVerb, pronoun, verbVerbal, voice, relativeWhat, adjAdv, prepConj, objectComplement, transitive, parallel, proVerb, inversion, tense, subjunctive, modal, mixed].map((t) => [t.id, t]),
);
