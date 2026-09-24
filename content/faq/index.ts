import type { FaqItem } from "@/lib/tutor/types";
import intro from "./intro.json";
import parts_of_speech from "./parts-of-speech.json";
import articles from "./articles.json";
import nouns from "./nouns.json";
import pronouns from "./pronouns.json";
import sentence_types from "./sentence-types.json";
import tenses from "./tenses.json";
import verbs_basics from "./verbs-basics.json";

/** 질문 도우미의 질문 은행. scripts/merge-drafts.py가 공개된 장의 content/faq/*.json을 모아 만든다. */
export const faq: FaqItem[] = [...intro, ...parts_of_speech, ...articles, ...nouns, ...pronouns, ...sentence_types, ...tenses, ...verbs_basics] as FaqItem[];
