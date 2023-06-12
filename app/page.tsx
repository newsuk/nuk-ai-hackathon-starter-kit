"use client";

import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { name: 'Prototype', href: '#', current: true },
  { name: 'Presentation', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const promptInput = useRef<HTMLInputElement>(null);

  const handlePrompt = () => {
    // Clear the pervious messages - turn chat into one-shot
    // prompting. Comment the line to go back to chat
    setAnswer('');

    if (promptInput && promptInput.current) {
      const prompt = promptInput.current.value;
      setLoading(true);
      fetchEventSource("http://localhost:3000/api", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        onmessage: (event) => {
          setLoading(false);
          if (event.data === "DONE") {
          } else {
            setAnswer((prev) => prev + event.data);
          }
        },
      });
    }
  };

  // focus input on page load
  useEffect(() => {
    if (promptInput && promptInput.current) {
      promptInput.current.focus();
    }
  }, []);
  
  return (
    <>
      <div className="min-h-full">
        <div className="bg-secondary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-8 w-8" src="/logo.svg" alt="Tech Innovation" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-tertiary text-tertiary'
                            : 'text-white hover:bg-tertiary hover:text-primary',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tech Innovation - Hackathon Starter Kit</h1>
          </div>
        </header>

        <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center w-full space-x-4">
            <div className="w-2/5">
              <label htmlFor="prompt" className="sr-only">Prompt</label>
              <input
                ref={promptInput}
                type="text"
                name="prompt"
                id="prompt"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePrompt();
                  }
                }}
                className="block rounded-md border-0 w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Write your prompt here..."
              />
            </div>
            <div>
              <button
                onClick={handlePrompt}
                type="button"
                className="rounded-md bg-green-dark px-3 py-2 rounded-md text-sm font-medium text-secondary hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Prompt
              </button>
            </div>
          </div>
          <div className="bg-gray-800 p-4 w-full mt-8 min-h-[300px] text-gray-50 rounded-md">
            {loading ? "Waiting for a response..." : answer}
          </div>
        </main>
      </div>
    </>
  )
}
