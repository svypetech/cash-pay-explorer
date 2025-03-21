// @ts-nocheck
"use client"

import { useState, useEffect, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ChevronDown, Plus, Play, Trash, FileCode, X, Edit } from "lucide-react"
import { useDarkMode } from "@/src/app/context/DarkModeContext"

// Define the validation schema with Zod
const querySchema = z.object({
    name: z.string().min(1, "Name is required"),
    url: z.string().min(1, "URL is required").url({ message: "Invalid URL format" }),
    wsUrl: z.string().min(1, "URL is required").url({ message: "Invalid URL format" }),
    headers: z
        .array(
            z.object({
                name: z.string(),
                value: z.string(),
            }),
        )
        .optional(),
})

type QueryFormValues = z.infer<typeof querySchema>

type Header = {
    name: string
    value: string
}

export default function GraphQLComponent() {
    const [activeTab, setActiveTab] = useState(0)
    const [queryArray, setQueryArray] = useState([
        {
            name: "Query 1",
            url: "",
            wsUrl: "",
            headers: [],
        },
    ])

    // Header state
    const [showAddHeaderPopup, setShowAddHeaderPopup] = useState(false)
    const [showStandardHeaderDropdown, setShowStandardHeaderDropdown] = useState(false)
    const [showRecentHeaderDropdown, setShowRecentHeaderDropdown] = useState(false)
    const [headerName, setHeaderName] = useState("")
    const [headerValue, setHeaderValue] = useState("")
    const [editingHeaderIndex, setEditingHeaderIndex] = useState<number | null>(null)
    const [recentHeaders, setRecentHeaders] = useState<Header[]>([])
    const dropdownRef = useRef<HTMLDivElement>(null);
    const recentDropdownRef = useRef<HTMLDivElement>(null);
    const { darkMode } = useDarkMode()
    const [showDark, setShowDark] = useState(darkMode)

    useEffect(() => {
        const timeout = setTimeout(() => setShowDark(darkMode), 100)
        return () => clearTimeout(timeout)
    }, [darkMode])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (recentDropdownRef.current && !recentDropdownRef.current.contains(event.target as Node)) {
                setShowRecentHeaderDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<QueryFormValues>({
        resolver: zodResolver(querySchema),
        defaultValues: {
            name: queryArray[activeTab].name,
            url: queryArray[activeTab].url,
            wsUrl: queryArray[activeTab].wsUrl,
            headers: queryArray[activeTab].headers,
        },
    })

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowStandardHeaderDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Update form when active tab changes
    useEffect(() => {
        if (queryArray[activeTab]) {
            reset({
                name: queryArray[activeTab].name,
                url: queryArray[activeTab].url,
                wsUrl: queryArray[activeTab].wsUrl,
                headers: queryArray[activeTab].headers,
            })
        }
    }, [activeTab, queryArray, reset])

    const onSubmit = (data: QueryFormValues) => {
        const updatedQueries = [...queryArray]
        updatedQueries[activeTab] = {
            name: data.name,
            url: data.url || "",
            wsUrl: data.wsUrl || "",
            headers: queryArray[activeTab].headers || [],
        }
        setQueryArray(updatedQueries)
        console.log("Saved query:", data)
    }

    const addNewQuery = () => {
        const newIndex = queryArray.length
        setQueryArray([
            ...queryArray,
            {
                name: `Query ${newIndex + 1}`,
                url: "",
                wsUrl: "",
                headers: [],
            },
        ])
        setActiveTab(newIndex)
    }

    const removeQuery = (index: number) => {
        if (queryArray.length === 1) return

        const updatedQueries = queryArray.filter((_, i) => i !== index)
        setQueryArray(updatedQueries)

        // If we're removing the active tab or a tab before it, adjust the active tab
        if (activeTab >= index) {
            setActiveTab(Math.max(0, activeTab - 1))
        }
    }

    // Header functions
    const openAddHeaderPopup = () => {
        setHeaderName("")
        setHeaderValue("")
        setEditingHeaderIndex(null)
        setShowAddHeaderPopup(true)
    }

    const openStandardHeaderPopup = () => {
        setShowStandardHeaderDropdown(showStandardHeaderDropdown => !showStandardHeaderDropdown)
    }

    const openOAuthHeaderPopup = () => {
        setHeaderName("Authorization")
        setHeaderValue("Bearer ")
        setEditingHeaderIndex(null)
        setShowStandardHeaderDropdown(false)
        setShowAddHeaderPopup(true)
    }

    const addHeader = () => {
        if (!headerName.trim()) return

        const newHeader = { name: headerName, value: headerValue }
        const updatedQueries = [...queryArray]

        if (editingHeaderIndex !== null) {
            // Edit existing header
            const updatedHeaders = [...(updatedQueries[activeTab].headers || [])] // @ts-ignore
            updatedHeaders[editingHeaderIndex] = newHeader
            updatedQueries[activeTab].headers = updatedHeaders
        } else {
            // Add new header
            // @ts-ignore
            updatedQueries[activeTab].headers = [...(updatedQueries[activeTab].headers || []), newHeader]



            // Add to recent headers if not already there
            if (!recentHeaders.some((h) => h.name === headerName)) {
                setRecentHeaders([...recentHeaders, newHeader])
                console.log("Recent headers:", recentHeaders)
            }

        }

        setQueryArray(updatedQueries)
        setShowAddHeaderPopup(false)
        setHeaderName("")
        setHeaderValue("")
        setEditingHeaderIndex(null)
    }

    const editHeader = (index: number) => {
        const header = queryArray[activeTab].headers?.[index]
        if (header) { // @ts-ignore
            setHeaderName(header.name) // @ts-ignore
            setHeaderValue(header.value)
            setEditingHeaderIndex(index)
            setShowAddHeaderPopup(true)
        }
    }

    const deleteHeader = (index: number) => {
        const updatedQueries = [...queryArray]
        const updatedHeaders = [...(updatedQueries[activeTab].headers || [])]
        updatedHeaders.splice(index, 1)
        updatedQueries[activeTab].headers = updatedHeaders
        setQueryArray(updatedQueries)
    }

    const addRecentHeader = (header: Header) => {
        const updatedQueries = [...queryArray]
        if (
            !updatedQueries[activeTab].headers?.some( // @ts-ignore
                (h) => h.name === header.name
            )
        ) {// @ts-ignore
            updatedQueries[activeTab].headers = [...(updatedQueries[activeTab].headers || []), header];
        }
        // updatedQueries[activeTab].headers = [...(updatedQueries[activeTab].headers || []), header]
        setQueryArray(updatedQueries)
        setShowRecentHeaderDropdown(false)
    }

    return (
        <div className='flex justify-center items-center '>
            <div className="w-full p-10 max-w-[800px] font-poppins my-[40px]">
                {/* Tabs */}
                <div className={`flex items-center gap-2 mb-8 ${showDark ? "border-none" : "border-b border-gray-200"} `} >
                    {queryArray.map((query, index) => (
                        <div
                            key={index}
                            className={`flex items-center rounded-t-md ${activeTab === index && showDark ? "bg-[#1E1E1E] border-none" : "bg-dark border border-gray-200"}`}
                        >
                            <button
                                onClick={() => setActiveTab(index)}
                                className={`flex items-center gap-2 px-4 py-2 text-sm ${activeTab === index ? "text-darkText font-medium" : "text-gray-500"
                                    }`}
                            >
                                {query.name}
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeQuery(index)
                                    }}
                                    className="h-5 w-5 rounded-full flex items-center justify-center text-xs border border-gray-300 hover:bg-gray-200 cursor-pointer"
                                >
                                    ×
                                </div>
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addNewQuery}
                        className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:cursor-pointer hover:scale-x-105"
                    >
                        <Plus className="h-4 w-4" />
                        New Query
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="sm:flex sm:justify-between" >
                        <div className="space-y-6">
                            <div className="flex items-center gap-[28px]">
                                <label className="sm:w-24 text-sm font-medium text-darkText">Name</label>
                                <div className="relative w-80">
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                placeholder={`Query ${activeTab + 1}`}
                                                className={`w-full rounded px-3 py-2 text-sm ${showDark ? "bg-[#1E1E1E]" : "border border-gray-300"} `}
                                            />
                                        )}
                                    />
                                    {errors.name && <p className="absolute text-xs text-red-500 mt-1">{errors.name.message}</p>}
                                </div>
                            </div>

                            <div className="flex items-center gap-[28px]">
                                <label className="sm:w-24 text-sm font-medium text-darkText">URL</label>
                                <div className="relative w-80">
                                    <Controller
                                        name="url"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                placeholder={`Query ${activeTab + 1}`}
                                                className={`w-full rounded px-3 py-2 text-sm ${showDark ? "bg-[#1E1E1E]" : "border border-gray-300"}`}
                                            />
                                        )}
                                    />
                                    {errors.url && <p className="absolute text-xs text-red-500 mt-1">{errors.url.message}</p>}

                                </div>
                            </div>

                            <div className="flex items-center gap-[28px]">
                                <label className="sm:w-24 text-sm font-medium text-darkText">WS URL</label>
                                <div className="relative w-80">
                                    <Controller
                                        name="wsUrl"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                placeholder={`Query ${activeTab + 1}`}
                                                className={`w-full rounded px-3 py-2 text-sm ${showDark ? "bg-[#1E1E1E]" : "border border-gray-300"}`}
                                            />
                                        )}
                                    />
                                    {errors.wsUrl && <p className="absolute text-xs text-red-500 mt-1">{errors.wsUrl.message}</p>}

                                </div>
                            </div>

                            <div className="flex items-center gap-[28px]">
                                <label className="sm:w-24 text-sm font-medium text-darkText">Headers</label>
                                <div className="flex relative">
                                    <button
                                        type="button"
                                        onClick={openAddHeaderPopup}
                                        className={`flex items-center gap-1 rounded-l-md px-3 py-1.5 text-sm cursor-pointer hover:scale-x-105 ${showDark ? "border border-[#1E1E1E]" : "border border-gray-300"}`}
                                    >
                                        <Plus className="h-3 w-3" />
                                        Add
                                    </button>

                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={openStandardHeaderPopup}
                                            className={`flex items-center gap-1 ${recentHeaders.length > 0 ? "" : "rounded-r-md"} px-3 py-1.5 text-sm cursor-pointer hover:scale-x-105 ${showDark ? "border border-[#1E1E1E]" : "border border-gray-300"}`}
                                        >
                                            Standard
                                            <ChevronDown className="h-3 w-3" />
                                        </button>

                                        {showStandardHeaderDropdown && (
                                            <div ref={dropdownRef} className={`absolute top-full left-0 mt-1 w-48 bg-dark border border-gray-200 rounded-md shadow-lg z-10`}>
                                                <button
                                                    type="button"
                                                    onClick={openOAuthHeaderPopup}
                                                    className="w-full text-left px-4 py-2 text-sm cursor-pointer hover:scale-105"
                                                >
                                                    OAuth 2 Bearer Token
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {recentHeaders.length > 0 && (
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setShowRecentHeaderDropdown(!showRecentHeaderDropdown)}
                                                className="flex items-center gap-1 rounded-r-md border border-gray-300 px-3 py-1.5 text-sm"
                                            >
                                                Recent
                                                <ChevronDown className="h-3 w-3" />
                                            </button>

                                            {showRecentHeaderDropdown && (
                                                <div ref={recentDropdownRef} className={`absolute top-full left-0 mt-1 w-48 bg-dark border border-gray-200 rounded-md shadow-lg z-10`}>
                                                    {recentHeaders.map((header, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            onClick={() => addRecentHeader(header)}
                                                            className="w-full text-left px-4 py-2 text-sm cursor-pointer hover:scale-x-105"
                                                        >
                                                            {header.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Insert the icon buttons below */}
                        <div className="flex gap-5 sm:gap-7 sm:flex-col mt-10 sm:mt-0 ">
                            <button type="button" className={`cursor-pointer`}>
                                {showDark ? <img src="/icons/downloadDarkIcon.svg" alt="download" className="h-8 w-8" /> : <img src="/icons/downloadIcon.svg" alt="download" className="h-8 w-8" />}
                            </button>
                            <button type="button" className="text-primary cursor-pointer">
                                {showDark ? <img src="/icons/uploadDarkIcon.svg" alt="upload" className="h-8 w-8" /> : <img src="/icons/uploadIcon.svg" alt="upload" className="h-8 w-8" />}
                            </button>
                            <button type="button" className=" text-primary cursor-pointer">
                                {showDark ? <img src="/icons/trashcanDarkIcon.svg" alt="play" className="h-8 w-8" /> : <img src="/icons/trashcanIcon.svg" alt="play" className="h-8 w-8" />}
                            </button>
                        </div>
                    </div>

                    {/* Headers Table */}
                    {queryArray[activeTab].headers && queryArray[activeTab].headers.length > 0 && (
                        <div className="mt-20">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left pb-2 text-sm font-medium text-darkText">Header Name</th>
                                        <th className="text-left pb-2 text-sm font-medium text-darkText">Header Value</th>
                                        <th className="w-20"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {queryArray[activeTab].headers.map((header, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="py-3 text-sm">{header.name}</td>
                                            <td className="py-3 text-sm">
                                                {header.name.toLowerCase() === "authorization" && header.value.startsWith("Bearer ")
                                                    ? `Bearer ${"•".repeat(15)}`
                                                    : header?.value}
                                            </td>
                                            <td className="py-3 flex items-center justify-end gap-2">
                                                <button type="button" onClick={() => editHeader(index)} className={`${showDark ? "text-skyblue" : "text-primary"} cursor-pointer hover:scale-110`}>
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button type="button" onClick={() => deleteHeader(index)} className="text-red-500 cursor-pointer hover:scale-110">
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* GraphQL Editor */}
                    <div className="mt-8 py-4">
                        <div className={`flex items-center gap-5 ${showDark ? "bg-[#1E1E1E] pb-0" : "bg-[#F6F6F6]"} p-[20px]`}>
                            <h3 className="text-xl font-semibold text-darkText">GraphiQL</h3>

                            <button type="button" className="rounded-full bg-[#27AAE11A] p-2 text-white">
                                <img src="/icons/play.svg" alt="Play" className="h-6 w-6" />
                            </button>
                            <button type="submit" className={`rounded-md ${showDark ? "bg-skyblue" : "bg-primary"} px-4 py-1.5 text-sm font-medium text-white hover:scale-105 cursor-pointer`}
                            >
                                Save
                            </button>

                        </div>
                        <div className={`font-mono text-sm p-5 ${showDark ? "bg-[#1E1E1E]" : "bg-white"}`}>
                            {`{transaction(hash: "0x69e3923eef50eada197c3336d546936d0c99421492c9f947a24c02827568f9f") { hash, blockNumber, value, gas }}`}
                        </div>
                    </div>
                </form>

                {/* Add Header Popup */}
                {showAddHeaderPopup && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                        <div className={`${showDark ? "bg-[#1E1E1E]" : "bg-gray-100"} rounded-lg shadow-lg w-96 p-6`}>
                            <h3 className="text-lg font-semibold mb-4">Add Header</h3>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={headerName}
                                    onChange={(e) => setHeaderName(e.target.value)}
                                    className={`w-full rounded ${showDark ? "bg-black focus:border-gray-300" : "border border-gray-300 focus:border-gray-700"} px-3 py-2 text-sm focus:border focus:outline-none`}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-1">Value</label>
                                <input
                                    type="text"
                                    value={headerValue}
                                    onChange={(e) => setHeaderValue(e.target.value)}
                                    className={`w-full rounded ${showDark ? "bg-black focus:border-gray-300" : "border border-gray-300 focus:border-gray-700"} px-3 py-2 text-sm focus:border focus:outline-none`}
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddHeaderPopup(false)}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:scale-x-105 cursor-pointer"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    onClick={addHeader}
                                    className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 hover:scale-x-105 cursor-pointer"
                                >
                                    {editingHeaderIndex !== null ? "Update" : "Add"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

