const mockData = {
    kpis: [
        { title: "Daily Production", value: "150k bbl", trend: "up", trendValue: "Target: 200k" },
        { title: "Non-Compliant Sites", value: "12.5%", trend: "down", trendValue: "Low Priority" },
        { title: "Active Partners", value: "500+", trend: "up", trendValue: "+5 this month" },
        { title: "System Uptime", value: "98%", trend: "up", trendValue: "Stable" }
    ],
    pipelines: [
        { id: "P-101", location: "Jubilee Field", severity: "High", status: "Critical", time: "10 mins ago" },
        { id: "P-102", location: "TEN Field", severity: "Medium", status: "Investigating", time: "45 mins ago" },
        { id: "P-103", location: "Sankofa Field", severity: "Low", status: "Reported", time: "2 hours ago" },
        { id: "P-104", location: "Offshore Cape Three Points", severity: "High", status: "Resolved", time: "Yesterday" },
        { id: "P-105", location: "Voltaian Basin", severity: "Medium", status: "Resolved", time: "Yesterday" }
    ],
    stakeholders: [
        { id: "S-001", name: "Tullow Oil", region: "Offshore", status: "Paid", lastContract: "₵ 1.2M" },
        { id: "S-002", name: "Kosmos Energy", region: "Jubilee", status: "Overdue", lastContract: "₵ 4.5M" },
        { id: "S-003", name: "ENI Ghana", region: "Sankofa", status: "Paid", lastContract: "₵ 0.85M" },
        { id: "S-004", name: "Anadarko", region: "TEN", status: "Paid", lastContract: "₵ 2.1M" },
        { id: "S-005", name: "VitOl Group", region: "Offshore", status: "Overdue", lastContract: "₵ 3.0M" }
    ],
    engineers: [
        { id: "E-01", name: "Emmanuel O.", status: "Busy", task: "Fixing Pipeline P-101", avatar: "👨🏿‍🔧" },
        { id: "E-02", name: "Sarah J.", status: "Available", task: "Waiting for dispatch", avatar: "👩🏿‍🔧" },
        { id: "E-03", name: "David K.", status: "Busy", task: "Maintenance at Rig St.", avatar: "👨🏿‍🔧" },
        { id: "E-04", name: "Grace A.", status: "Available", task: "On break", avatar: "👩🏿‍🔧" }
    ]
};