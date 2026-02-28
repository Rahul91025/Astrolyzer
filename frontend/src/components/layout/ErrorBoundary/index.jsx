import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
                    {/* Background Decor */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

                    <div className="glass-card p-12 rounded-3xl border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)] relative z-10 max-w-lg w-full">
                        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-8">
                            <span className="text-3xl text-red-500">⚠</span>
                        </div>
                        <h2 className="text-3xl font-display font-bold text-white mb-4">Cosmic Interference</h2>
                        <p className="text-gray-400 font-light mb-8 leading-relaxed">
                            The stars seem to be out of alignment. We encountered an unexpected error while trying to process your request.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFDF73] text-black font-semibold text-sm tracking-widest uppercase rounded-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                Realign Stars
                            </button>
                            <Link
                                to="/"
                                className="px-6 py-3 border border-white/20 text-white font-semibold text-sm tracking-widest uppercase rounded-lg hover:bg-white/5 transition-all"
                            >
                                Return Home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
