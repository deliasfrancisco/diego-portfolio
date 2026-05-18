'use client'
import { FaWhatsapp } from 'react-icons/fa'
import { OWNER } from '@/data/content'

const MESSAGE = encodeURIComponent("Hi Diego, I'd like to talk about a project!")

export default function WhatsAppButton() {
  if (!OWNER.whatsapp || OWNER.whatsapp.includes('X')) return null

  return (
    <a
      href={`https://wa.me/${OWNER.whatsapp}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[80] flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}
