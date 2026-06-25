export type QaTool = {
	id: string;
	name: string;
	inactiveColor: string;
};

export const QA_TOOLS: QaTool[] = [
	{ id: "1", name: "ReactJs", inactiveColor: "bg-cyan-600" },
	{ id: "2", name: "NodeJs", inactiveColor: "bg-green-600" },
	{ id: "3", name: "MongoDb", inactiveColor: "bg-gray-600" },
	{ id: "4", name: "ExpressJs", inactiveColor: "bg-blue-600" },
	{ id: "6", name: "JavaScript", inactiveColor: "bg-yellow-800" },
	{ id: "9", name: "NextJs", inactiveColor: "bg-slate-800" },
	{ id: "10", name: "TypeScript", inactiveColor: "bg-blue-700" },
	{ id: "8", name: "AI & ML", inactiveColor: "bg-red-600" },
	{ id: "11", name: "Python", inactiveColor: "bg-indigo-600" },
	{ id: "18", name: "Others", inactiveColor: "bg-violet-600" },
];

const ACTIVE_TOOL_STYLE =
	"bg-transparent border border-blue-600 shadow-lg";

export const getQaToolStyles = (
	activeSelection: string | undefined,
	toolId: string,
	inactiveColor: string
) =>
	activeSelection === toolId ? ACTIVE_TOOL_STYLE : inactiveColor;

export const getQaToolName = (toolId: string | undefined) =>
	QA_TOOLS.find((tool) => tool.id === toolId)?.name ?? "Qa";
