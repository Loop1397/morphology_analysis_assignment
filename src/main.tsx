import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Index from "./index.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Index />
    </StrictMode>
);
