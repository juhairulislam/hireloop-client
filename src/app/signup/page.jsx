"use client";

import { useState } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input } from "@heroui/react";
import { Radio, RadioGroup } from "@heroui/react";
import { Eye, EyeSlash, Person, At, ShieldKeyhole } from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("seeker");

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignup = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        const plan = role === 'seeker' ? 'seeker_free' : 'recruiter_free';

        try {
            const { data, error: authError } = await signUp.email({
                email,
                password,
                name,
                role,
                plan
            });

            if (authError) {
                setError(authError.message || "Something went wrong during signup.");
            } else {
                setSuccess("Account created successfully! Welcome.");
                setName("");
                setEmail("");
                setPassword("");
                router.push(redirectTo);
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a12] px-4 relative overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

            <Card className="relative w-full max-w-md p-8 rounded-2xl bg-[#111122]/70 backdrop-blur-xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.2)] transition-all duration-500">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                        Create an <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">Account</span>
                    </h1>
                    <p className="text-sm text-gray-400">Fill in the fields below to get started</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                    
                    <TextField isRequired name="name" className="space-y-1.5">
                        <Label className="text-xs font-semibold text-purple-400 tracking-wider uppercase">Name</Label>
                        <InputGroup className="relative group flex items-center border border-gray-800 rounded-xl px-3.5 bg-[#0d0d1a]/80 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all duration-300">
                            <Person className="text-gray-500 group-focus-within:text-purple-400 transition-colors pointer-events-none" size={16} />
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                                className="w-full bg-transparent py-3 pl-2 text-sm outline-none border-none text-white placeholder-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </InputGroup>
                    </TextField>

                    <TextField isRequired name="email" type="email" className="space-y-1.5">
                        <Label className="text-xs font-semibold text-purple-400 tracking-wider uppercase">Email Address</Label>
                        <InputGroup className="relative group flex items-center border border-gray-800 rounded-xl px-3.5 bg-[#0d0d1a]/80 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all duration-300">
                            <At className="text-gray-500 group-focus-within:text-purple-400 transition-colors pointer-events-none" size={16} />
                            <Input
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="w-full bg-transparent py-3 pl-2 text-sm outline-none border-none text-white placeholder-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </InputGroup>
                    </TextField>

                    <TextField isRequired name="password" className="space-y-1.5">
                        <Label className="text-xs font-semibold text-purple-400 tracking-wider uppercase">Password</Label>
                        <InputGroup className="relative group flex items-center border border-gray-800 rounded-xl px-3.5 bg-[#0d0d1a]/80 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all duration-300">
                            <ShieldKeyhole className="text-gray-500 group-focus-within:text-purple-400 transition-colors pointer-events-none" size={16} />
                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="Choose a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className="w-full bg-transparent py-3 pl-2 pr-2 text-sm outline-none border-none text-white placeholder-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <button
                                className="focus:outline-none text-gray-500 hover:text-purple-400 transition-colors disabled:opacity-50"
                                type="button"
                                onClick={toggleVisibility}
                                disabled={isLoading}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </InputGroup>
                    </TextField>

                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-purple-400 tracking-wider uppercase">Account Type</Label>
                        <RadioGroup 
                            defaultValue="seeker" 
                            name="role" 
                            onChange={value => setRole(value)} 
                            orientation="horizontal"
                            className="flex gap-4"
                        >
                            <Radio value="seeker" className="text-white text-sm cursor-pointer accent-purple-500">
                                <Radio.Control>
                                    <Radio.Indicator className="bg-purple-500" />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label className="text-sm text-gray-300 cursor-pointer pl-1">Job Seeker</Label>
                                </Radio.Content>
                            </Radio>
                            <Radio value="recruiter" className="text-white text-sm cursor-pointer accent-purple-500">
                                <Radio.Control>
                                    <Radio.Indicator className="bg-purple-500" />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label className="text-sm text-gray-300 cursor-pointer pl-1">Recruiter</Label>
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>

                    {error && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-red-950/40 text-red-400 border border-red-900/50 backdrop-blur-md">
                            <span className="font-semibold">Error:</span> {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 backdrop-blur-md">
                            <span className="font-semibold">Success:</span> {success}
                        </div>
                    )}

                    <Button
                        type="submit"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        className="w-full mt-2 py-3.5 px-4 rounded-xl bg-linear-to-r from-purple-600 to-cyan-500 text-white font-semibold tracking-wide hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transform active:scale-[0.98] transition-all duration-300 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 h-12"
                    >
                        Sign Up
                    </Button>

                    <div className="mt-6 text-center pt-4 border-t border-purple-500/10 text-xs text-gray-500">
                        Already have an account?{" "}
                        <Link 
                            href={`/signin?redirect=${redirectTo}`} 
                            className="font-medium cursor-pointer text-xs text-cyan-400 hover:text-purple-400 transition-colors duration-200 underline underline-offset-4 decoration-cyan-500/50 hover:decoration-purple-400"
                        >
                            Sign in instead
                        </Link>
                    </div>

                </form>
            </Card>
        </div>
    );
}