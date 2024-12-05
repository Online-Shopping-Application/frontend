import React, { useEffect } from "react";
import Layout from "../../components/PageLayout/Layout";
import Overview from "../../components/Overview/Overview";

export default function Dashboard() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    return (
        <div>
           <Layout>
                <Overview />
           </Layout>
        </div>
    )
}

