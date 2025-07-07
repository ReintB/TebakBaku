"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ScrollToTopButton() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShow(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!show) return null;

    return (
        <Button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 rounded-full w-16 h-16 p-0 shadow-2xl hover:shadow-3xl transition-all bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 border-4 border-background/80 z-50"
            size="lg"
            aria-label="Scroll to top"
        >
            <span className="text-3xl">↑</span>
        </Button>
    );
} 