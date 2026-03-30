// ContactForm.tsx (updated)
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegEnvelope, FaRegFileAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export default function ContactForm() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "", project: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.project) {
            setStatus({ type: 'error', message: 'Please fill in all required fields (Name, Email, Project).' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: null, message: '' });

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
                setForm({ name: "", email: "", phone: "", project: "" });
                // Close modal after 2 seconds
                setTimeout(() => {
                    setIsFormOpen(false);
                    setStatus({ type: null, message: '' });
                }, 2000);
            } else {
                throw new Error(data.error || 'Something went wrong');
            }
        } catch (error) {
            setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Failed to send message. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <footer id="contact" className="bg-[#0e0e0e] py-32 px-6 flex flex-col items-center justify-center relative overflow-hidden border-t border-white/[0.06]">
                {/* Background glow (unchanged) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/[0.02] to-transparent pointer-events-none" />

                {/* Heading (unchanged) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight">
                        Let&apos;s Work <span className="font-bold">Together</span>
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
                        Currently open to full-stack roles in Morocco or remote. Whether you have an enterprise project or a creative vision to bring to life, I&apos;d love to hear from you.
                    </p>
                </motion.div>

                {/* Buttons (unchanged) */}
                <div className="flex items-center gap-4 mb-16">
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.12] rounded-full text-white text-sm font-medium transition-all duration-300"
                    >
                        <FaRegEnvelope className="text-sm" />
                        SEND A MESSAGE
                        <span className="ml-1 text-gray-400">→</span>
                    </button>

                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-7 py-3.5 bg-white/[0.08] hover:bg-white/[0.13] border border-white/[0.12] rounded-full text-white text-sm font-bold tracking-wider transition-all duration-300"
                    >
                        <FaRegFileAlt className="text-sm" />
                        DOWNLOAD CV
                    </a>
                </div>

                {/* Footer bottom (unchanged) */}
                <p className="text-gray-600 text-xs tracking-[0.2em]">
                    © {new Date().getFullYear()} ABDESSAMAD · FULL STACK WEB DEVELOPER
                </p>
            </footer>

            {/* Contact Form Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsFormOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />

                        {/* Form Card */}
                        <motion.div
                            initial={{ opacity: 0, x: "-50%", y: "-40%", scale: 0.95 }}
                            animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
                            exit={{ opacity: 0, x: "-50%", y: "-40%", scale: 0.95 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed left-1/2 top-1/2 z-[101] w-[92%] md:w-[480px] bg-[#1a1a1a] border border-white/[0.08] rounded-2xl p-8 shadow-2xl"
                        >
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2 block">Your Name *</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2 block">Email *</label>
                                    <input
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="john@company.com"
                                        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2 block">WhatsApp / Phone</label>
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+212 6XX XXX XXX"
                                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2 block">About Your Project *</label>
                                <textarea
                                    name="project"
                                    value={form.project}
                                    onChange={handleChange}
                                    placeholder="What do you want to build?"
                                    rows={4}
                                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors resize-none"
                                />
                                <p className="text-gray-600 text-[11px] mt-2">A short message is enough. Include your goal, timeline, or the main problem you want solved.</p>
                            </div>

                            {status.message && (
                                <div className={`text-xs mb-4 p-2 rounded ${status.type === 'success' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                                    {status.message}
                                </div>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-4 rounded-full hover:bg-gray-100 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                <IoSend />
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}