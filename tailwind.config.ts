import type { Config } from "tailwindcss";
export default { content: ["./src/**/*.{ts,tsx}"], theme: { extend: {
 colors: { brand: "#a51be5", accent: "#ed36b7", cream: "#f8f4ff", ink: "#100d22", night: "#090718" },
 fontFamily: { display: ["var(--font-display)", "serif"], sans: ["var(--font-sans)", "sans-serif"] } } }, plugins: [] } satisfies Config;
