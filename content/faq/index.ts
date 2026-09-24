import type { FaqItem } from "@/lib/tutor/types";
import intro from "./intro.json";
import partsOfSpeech from "./parts-of-speech.json";
import articles from "./articles.json";
import pronouns from "./pronouns.json";

/** 질문 도우미의 질문 은행. 장이 늘어나면 여기에 파일을 더한다. */
export const faq: FaqItem[] = [...intro, ...partsOfSpeech, ...articles, ...pronouns] as FaqItem[];
