"use client";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SignatureScene, { SceneType } from "@/components/SignatureScene";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeScene, setActiveScene] = useState<SceneType>("none");

  return (
    <main className="min-h-screen bg-black">
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Nav activeScene={activeScene} setActiveScene={setActiveScene} />
          <SignatureScene activeScene={activeScene} setActiveScene={setActiveScene} />
        </>
      )}
    </main>
  );
}
