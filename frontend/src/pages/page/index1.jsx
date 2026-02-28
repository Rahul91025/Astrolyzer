import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { SignedIn, SignedOut, RedirectToSignIn, UserProfile } from '@clerk/clerk-react';

const Auth = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
                <div className="max-w-6xl w-full">
                    <div className="text-center mb-16">
                        <h1 className="text-7xl font-thin text-gray-900 mb-8 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent tracking-tighter leading-tight">
                            My Account
                        </h1>
                        <div className="w-40 h-px bg-gradient-to-r from-orange-400 to-orange-500 mx-auto rounded-full mb-8"></div>
                        <p className="text-gray-600 text-2xl font-light max-w-3xl mx-auto leading-relaxed tracking-wide">
                            Manage your profile and preferences with elegance and simplicity
                        </p>
                    </div>
                    <SignedIn>
                        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-orange-50 hover:shadow-3xl transition-all duration-500 ease-out transform hover:scale-[1.02]">
                            <UserProfile
                                appearance={{
                                    elements: {
                                        card: "bg-transparent shadow-none",
                                        navbar: "bg-transparent border-b border-orange-50",
                                        pageScrollBox: "bg-transparent",
                                        navbarButton: "text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:bg-orange-50/50 rounded-lg px-3 py-2",
                                        profileSectionTitleText: "text-gray-900 font-thin text-3xl tracking-tight",
                                        profileSectionPrimaryButton: "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
                                        profileSectionContent: "text-gray-700 font-light",
                                        formButtonPrimary: "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",
                                        formFieldInput: "bg-white border-orange-100 rounded-2xl text-gray-800 placeholder-gray-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 transition-all duration-300 shadow-sm hover:shadow-md",
                                        userPreview: "text-gray-900 font-light",
                                        userPreviewTextContainer: "text-gray-900 font-light",
                                        userPreviewAvatarBox: "border-orange-100 shadow-sm hover:shadow-lg transition-all duration-300",
                                        userButton: "text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium hover:bg-orange-50/50 rounded-lg px-3 py-2",
                                        breadcrumbs: "text-gray-500 font-light",
                                        breadcrumbsItem: "text-gray-500 hover:text-orange-500 transition-all duration-300 font-light",
                                        breadcrumbsButton: "text-gray-500 hover:text-orange-500 transition-all duration-300 font-light",
                                        headerTitle: "text-gray-900 font-thin text-4xl tracking-tight",
                                        headerSubtitle: "text-gray-600 font-light text-lg",
                                        rootBox: "bg-transparent",
                                        scrollBox: "bg-transparent"
                                    }
                                }}
                            />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <RedirectToSignIn />
                    </SignedOut>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default Auth;
