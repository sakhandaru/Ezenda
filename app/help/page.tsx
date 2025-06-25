import React from "react";
import { Layout } from "@/components/layout"


export default function HelpPage() {
    return (
        <Layout >
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
                <h1>Fitur Bantuan Akan Datang</h1>
                <p>Halaman ini sedang dalam pengembangan. Nantikan fitur bantuan terbaru dari kami!</p>
            </div>
        </div>
        </Layout >
    );
}