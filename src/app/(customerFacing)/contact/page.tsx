"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import { addContact } from "../_actions/contact";
import { Contact } from "@prisma/client";

export default function ContactComponent({
  contact,
}: {
  contact?: Contact | null;
}) {
  const [error, action] = useFormState(addContact, {});

  const [name, setName] = useState<string | undefined>(contact?.fullName);
  const [email, setEmail] = useState<string | undefined>(contact?.email);
  const [message, setMessage] = useState<string | undefined>(contact?.message);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <style jsx>{`
        .customBlue {
          background-color: #1d4ed8;
        }
        .customBlueDark {
          background-color: #1e3a8a;
        }
        .customRed {
          background-color: #ef4444;
        }
        .customGreen {
          background-color: #10b981;
        }
      `}</style>
      <form
        className="bg-white p-10 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 w-full max-w-2xl"
        action={action}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Contact Us
        </h2>
        <Label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </Label>
        <Input
          type="text"
          id="fullName"
          name="fullName"
          required
          value={name || ""}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-customBlue focus:border-customBlue sm:text-sm transition-all duration-300"
        />
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mt-6"
        >
          Email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          value={email || ""}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-customBlue focus:border-customBlue sm:text-sm transition-all duration-300"
        />
        <Label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mt-6"
        >
          Message
        </Label>
        <textarea
          id="message"
          name="message"
          required
          value={message || ""}
          placeholder="Enter your message"
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-customBlue focus:border-customBlue sm:text-sm transition-all duration-300 h-32"
        />
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full px-6 py-3 mt-8 text-sm font-medium tracking-wide text-white bg-red-700 capitalize transition-all duration-300 transform customBlue rounded-lg hover:bg-customRed hover:text-white focus:outline-none focus:ring focus:ring-customBlue focus:ring-opacity-50"
    >
      {pending ? "Sending..." : "Send"}
    </Button>
  );
}
