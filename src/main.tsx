import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import Index from "./pages/MorphologyAnalysis.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Index />
    </StrictMode>
);
