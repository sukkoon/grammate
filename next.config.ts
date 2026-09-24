import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    // 한 개짜리 물결표(~)는 취소선으로 바꾸지 않는다: "~처럼 ~하는" 같은 설명이 많아서
    remarkPlugins: [["remark-gfm", { singleTilde: false }]],
  },
});

export default withMDX(nextConfig);
