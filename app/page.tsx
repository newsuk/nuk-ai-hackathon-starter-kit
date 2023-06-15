"use client";

import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useEffect, useRef, useState } from "react";

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

        <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">


            <div>
              
              <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Edit your article:</label>
              <textarea ref={promptInput} id="message" rows="4" className="block h-64 p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 border-gray-200 placeholder-gray-400 text-black focus:ring-green-dark focus:border-green-dark" placeholder="Edit your text"></textarea>

            </div>

            <div className="flex justify-center">
                <button className="block mt-10 p-2 justify-content-center border rounded-lg border-green-dark bg-gray-200" onClick={handlePrompt}>Get Recommendations</button>
            </div>
            
            <div className="block">
              {answer && <h3 className="block pb-10">Recommendations: </h3>}
              <div className="block">
                {answer}
              </div>
            </div>
        </main>

    </>  )
}
