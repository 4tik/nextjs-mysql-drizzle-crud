import fs from "fs";
import path from "path";

export type AppRoute = {
    path: string;
    type: "page" | "api";
};

const appDirectory = path.join(process.cwd(), "src", "app");

function scanDirectory(
    directory: string,
    baseRoute = "",
    routes: AppRoute[] = []
): AppRoute[] {
    if (!fs.existsSync(directory)) {
        return routes;
    }

    const entries = fs.readdirSync(directory, {
        withFileTypes: true,
    });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            // Ignore Next.js special folders
            if (
                entry.name.startsWith("(") ||
                entry.name.startsWith("_") ||
                entry.name === "node_modules"
            ) {
                scanDirectory(fullPath, baseRoute, routes);
                continue;
            }

            const routeSegment = entry.name;
            const nextRoute = `${baseRoute}/${routeSegment}`;

            scanDirectory(fullPath, nextRoute, routes);
        }

        if (entry.isFile()) {
            if (entry.name === "page.tsx" || entry.name === "page.ts") {
                routes.push({
                    path: baseRoute || "/",
                    type: "page",
                });
            }

            if (entry.name === "route.ts" || entry.name === "route.tsx") {
                routes.push({
                    path: baseRoute || "/",
                    type: "api",
                });
            }
        }
    }

    return routes;
}

export function getAppRoutes(): AppRoute[] {
    return scanDirectory(appDirectory).sort((a, b) =>
        a.path.localeCompare(b.path)
    );
}