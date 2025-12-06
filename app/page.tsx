'use client';
import Image from 'next/image';
import React, { useState } from 'react';

// --- TypeScript Interfaces ---
interface Jumper {
  id: string;
  name: string;
  description: string;
  size: string;
  capacity: string;
  price: string;
  image: string;
  colorClass: string; // To handle the specific text colors from your design
}

// --- Data ---
const JUMPERS: Jumper[] = [
  {
    id: 'classic',
    name: 'The Classic Castle',
    description: 'Perfect for younger kids, this brightly colored jumper provides classic, safe bouncing fun.',
    size: '13ft x 13ft',
    capacity: '8 Children',
    price: '$150',
    image: '/classiccastle.png',
    colorClass: 'text-[#FF6B6B]', // Primary Red
  },
  {
    id: 'combo',
    name: 'The Ultimate Combo',
    description: 'A massive unit featuring a large bounce area and an exciting inflatable slide.',
    size: '25ft x 15ft',
    capacity: '10 Children',
    price: '$225',
    image: '/slidecombo.png',
    colorClass: 'text-[#4ECDC4]', // Secondary Teal
  },
  {
    id: 'toddler',
    name: 'Toddler Fun Zone',
    description: 'Low-profile walls and soft obstacles designed specifically for toddlers and preschoolers.',
    size: '10ft x 10ft',
    capacity: '6 Toddlers',
    price: '$120',
    image: '/toddlerzone.png',
    colorClass: 'text-[#FFE66D]', // Accent Yellow
  },
];

export default function Home() {
  // New State: Tracks which jumper option should be pre-selected in the form.
  const [selectedJumper, setSelectedJumper] = useState<string>(''); 
  
  // State for form submission feedback
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [successMessage, setSuccessMessage] = useState('');

  // New Handler: Sets the selected jumper and scrolls to the contact form.
  const handleRentNow = (jumperName: string) => {
    setSelectedJumper(jumperName);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form Handler (Updated to use setSelectedJumper when resetting)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const date = formData.get('date') as string;
    const jumperType = formData.get('jumper-type') as string;

    if (!name || !date || !jumperType) {
      setFormStatus('error');
      return;
    }

    // Simulate Success
    setSuccessMessage(`Thank you, ${name}! Your request for the ${jumperType} on ${date} has been submitted.`);
    setFormStatus('success');
    
    // Do not reset the form, only reset the status/message states. 
    // We will let the user clear fields if they want to.
    
    // Clear the form fields after successful simulation, except for the selected jumper
    // e.currentTarget.reset(); // Removed this line to control resets better.
    (document.getElementById('name') as HTMLInputElement).value = '';
    (document.getElementById('date') as HTMLInputElement).value = '';
    (document.getElementById('notes') as HTMLTextAreaElement).value = '';
    
    // Reset the selected jumper state after a slight delay if needed, or keep it set. 
    // For now, let's keep it set until they manually change it.
    
    // Reset message after 7 seconds
    setTimeout(() => {
      setFormStatus('idle');
      setSuccessMessage('');
    }, 7000);
  };

  return (
    <div className="min-h-screen font-sans bg-[#F7FFF7] text-[#333333]">
      
      {/* --- HEADER (No Changes) --- */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <a href="#" className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <span className="text-3xl">🎈</span> JumpStart
          </a>
          
          <nav className="hidden md:flex space-x-8 font-medium">
            <a href="#jumpers" className="text-gray-600 hover:text-[#FF6B6B] transition">Our Jumpers</a>
            <a href="#pricing" className="text-gray-600 hover:text-[#FF6B6B] transition">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-[#FF6B6B] transition">Book Now</a>
          </nav>
          
          <a href="#contact" className="md:hidden bg-[#FF6B6B] px-4 py-2 rounded-lg text-white font-semibold">
            Book
          </a>
        </div>
      </header>

      {/* --- HERO SECTION (No Changes) --- */}
      <section 
        className="relative py-16 md:py-24 text-white bg-linear-to-br from-[#FF6B6B] to-[#4ECDC4]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-4 drop-shadow-md">
            The Party Starts Here!
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-8 max-w-2xl mx-auto drop-shadow-sm">
            Clean, Safe, & Fun Jumpers for any occasion. We bring the bounce to your event!
          </p>
          <a href="#jumpers" className="inline-block px-8 py-4 text-lg font-bold rounded-full text-[#333333] bg-[#FFE66D] hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg">
            Explore Our Collection
          </a>
          
          <Image 
            src="/classiccastle.png"
            alt="Large, colorful bouncy castle"
            width={600}
            height={400}
            className="mt-12 w-full max-w-xl mx-auto rounded-xl shadow-2xl object-cover"
          />
        </div>
      </section>

      {/* --- JUMPER SHOWCASE (Rent Now Button Modified) --- */}
      <section id="jumpers" className="py-16 sm:py-24 bg-[#F7FFF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-[#333333]">
            Our Top Jumpers for Rent
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {JUMPERS.map((jumper) => (
              <div key={jumper.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition duration-300">
                <Image 
                  src={jumper.image}
                  alt={jumper.name}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${jumper.colorClass}`}>{jumper.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{jumper.description}</p>
                  <ul className="text-sm space-y-1 text-gray-700 mb-4">
                    <li><span className="font-semibold">Size:</span> {jumper.size}</li>
                    <li><span className="font-semibold">Capacity:</span> {jumper.capacity}</li>
                  </ul>
                  {/* MODIFIED BUTTON: Added onClick handler */}
                  <button 
                    onClick={() => handleRentNow(jumper.name)}
                    className="inline-block w-full cursor-pointer text-center px-6 py-2 bg-[#FF6B6B] hover:bg-[#e55c5c] text-white font-semibold rounded-lg transition"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION (No Changes) --- */}
      <section id="pricing" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-[#333333]">
            Simple, Transparent Pricing
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 md:p-10 shadow-lg border border-gray-100">
              <div className="space-y-6">
                <PricingItem 
                  title="Standard Jumper (13x13)" 
                  desc="Up to 8 hours rental. Includes delivery, setup, and takedown." 
                  price="$150"
                  color="text-[#FF6B6B]" 
                />
                <PricingItem 
                  title="Jumper Combo w/ Slide" 
                  desc="Up to 8 hours rental. The big one for maximum fun!" 
                  price="$225"
                  color="text-[#4ECDC4]" 
                />
                <PricingItem 
                  title="Toddler Zone (10x10)" 
                  desc="Safe, soft play for the little ones, up to 8 hours." 
                  price="$120"
                  color="text-[#FFE66D]" 
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-8">
                *All prices subject to local taxes and a potential small travel fee outside our service area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION (Form Input Modified) --- */}
      <section id="contact" className="py-16 sm:py-24 bg-[#4ECDC4] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
            Ready to Book? Let&apos;s Plan the Fun!
          </h2>

          {/* Status Message Box */}
          {formStatus === 'success' && (
            <div className="p-4 mb-6 rounded-lg text-center font-bold bg-green-500 text-white shadow-md animate-pulse">
              {successMessage}
            </div>
          )}
          {formStatus === 'error' && (
             <div className="p-4 mb-6 rounded-lg text-center font-bold bg-red-500 text-white shadow-md">
               Please fill in all required fields.
             </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-xl shadow-2xl space-y-4 text-gray-800">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" name="name" required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B] outline-none"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Event Date</label>
              <input type="date" id="date" name="date" required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B] outline-none"
              />
            </div>
            <div>
              <label htmlFor="jumper-type" className="block text-sm font-medium text-gray-700">Preferred Jumper</label>
              {/* MODIFIED SELECT: Added value and onChange handler */}
              <select 
                id="jumper-type" 
                name="jumper-type" 
                required
                value={selectedJumper} // Binds the state to the input value
                onChange={(e) => setSelectedJumper(e.target.value)} // Allows manual change
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B] outline-none bg-white"
              >
                <option value="">-- Select a Jumper --</option>
                {/* Ensure option values match the Jumper name for accurate pre-filling */}
                <option value="The Classic Castle">The Classic Castle ($150)</option>
                <option value="The Ultimate Combo">The Ultimate Combo ($225)</option>
                <option value="Toddler Fun Zone">Toddler Fun Zone ($120)</option>
              </select>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea id="notes" name="notes" rows={3}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B] outline-none"
              ></textarea>
            </div>
            <button type="submit" className="w-full py-3 text-lg font-bold rounded-lg text-white bg-[#FF6B6B] hover:bg-[#e55c5c] transition transform active:scale-95">
              Submit Booking Request
            </button>
          </form>

        </div>
      </section>

      {/* --- FOOTER (No Changes) --- */}
      <footer className="bg-[#333333] py-8 text-center text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} JumpStart Rentals. All rights reserved.</p>
          <p className="mt-2">Serving the San Diego Area. Licenced and Insured.</p>
          <div className="mt-4 space-x-4">
            <span className="hover:text-white transition cursor-pointer">Call Us: (555) 123-4567</span>
            <span className="hover:text-white transition cursor-pointer">Email: info@jumpstartrentals.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Sub-Components (No Changes) ---

function PricingItem({ title, desc, price, color }: { title: string, desc: string, price: string, color: string }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-0 last:pb-0">
      <div>
        <h3 className={`text-xl font-bold ${color}`}>{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>
      <span className="text-2xl font-extrabold text-[#333333]">{price}</span>
    </div>
  );
}