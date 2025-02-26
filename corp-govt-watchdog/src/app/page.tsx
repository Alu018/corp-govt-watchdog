import Image from "next/image";
// import { Send } from "lucide-react";
// import { useState } from "react";

// export default function MessageInput() {
//   const [message, setMessage] = useState("");

//   const sendMessage = () => {
//     if (message.trim() !== "") {
//       alert(`Sending message: ${message}`);
//       setMessage(""); // Clear input after sending
//     }
//   };

//   return (
//     <div className="relative w-full">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message..."
//         className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
//       />
//       <button
//         onClick={sendMessage}
//         className="absolute inset-y-0 right-2 flex items-center text-blue-500 hover:text-blue-700"
//       >
//         <Send className="w-5 h-5" />
//       </button>
//     </div>
//   );
// }


export default function Home() {
  const promptSuggestions = [
    { id: 1, text: "Alert when government subsidies are allocated to factory farms" },
    { id: 2, text: "Monitor corporate donations to lawmakers voting on animal welfare" },
    { id: 3, text: "Track upcoming votes on wildlife protections in Congress" },
    { id: 4, text: "Notify whenever there is a new bill affecting factory farming regulations" },
    { id: 5, text: "Track penalties issued to companies violating animal welfare laws" },
    { id: 6, text: "Alert when public sentiment shifts on animal testing policies" },
    { id: 7, text: "Monitor new trade agreements impacting live animal exports" },
    { id: 8, text: "Notify when fast food chains update their animal welfare commitments" },
    { id: 9, text: "Track lawsuits filed against companies for animal cruelty" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <div className="w-full max-w-4xl flex justify-center items-center">
          <Image
            className="dark:invert"
            src="/open-paws-logo.png"
            alt="open paws logo"
            width={60}
            height={38}
            priority
          />
          <h1 className="text-4xl">Welcome to your Watchdog, Sam</h1>
        </div>
        <div className="flex justify-center" >Watchdog is your personal assistant for researching, monitoring, and reporting on regulatory changes impacting the treatment of animals</div>

        <div className="w-full flex justify-center">
          <form
            className="w-full"
            action="https://openpaws.app.n8n.cloud/webhook-test/7d977fcf-05e7-4248-bf9e-04db99380c87"
            method="POST"
          >
            <input
              type="text"
              name="text"
              placeholder="Ask me about any animal welfare topic to start setting up your animal alert campaign"
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Send
            </button>

          </form>
        </div>

        <div className="w-full flex justify-center text-lg">Need inspiration? Here are some things you can ask me:</div>

        <div className="grid grid-cols-3 gap-4 p-8 max-w-4xl mx-auto">
          {promptSuggestions.map((p) => (
            <div key={p.id} className="border-gray-300 border-2 italic text-white p-3 text-center text-sm rounded-lg">
              {p.text}
            </div>
          ))}
        </div>


      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Disclaimer
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Statement
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          /> */}
          Terms & Conditions
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          © 2025 OpenPaws.AI and/or its affiliates. All rights reserved.
        </a>
      </footer>
    </div>
  );
}
