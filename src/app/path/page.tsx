import { getAppRoutes } from "@/src/lib/routes";

export default function RoutesPage() {
    const routes = getAppRoutes();

    const pages = routes.filter((route) => route.type === "page");
    const apiRoutes = routes.filter((route) => route.type === "api");

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Application Routes
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Automatically detected routes from src/app
                    </p>
                </div>

                {/* Pages */}
                <div className="mb-8">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Pages
                        </h2>

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                            {pages.length}
                        </span>
                    </div>

                    <div className="overflow-hidden rounded-lg border bg-white">
                        {pages.map((route) => (
                            <div
                                key={`page-${route.path}`}
                                className="flex items-center justify-between border-b px-5 py-4 last:border-b-0"
                            >
                                <span className="text-sm font-medium text-gray-700">
                                    {route.path}
                                </span>

                                <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                    PAGE
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* API */}
                <div>
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">
                            API Routes
                        </h2>

                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                            {apiRoutes.length}
                        </span>
                    </div>

                    <div className="overflow-hidden rounded-lg border bg-white">
                        {apiRoutes.map((route) => (
                            <div
                                key={`api-${route.path}`}
                                className="flex items-center justify-between border-b px-5 py-4 last:border-b-0"
                            >
                                <span className="font-mono text-sm text-gray-700">
                                    {route.path}
                                </span>

                                <span className="rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                                    API
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}