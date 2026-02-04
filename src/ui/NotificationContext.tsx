import { createContext, useContext, useState } from "react";

type NotificationType = "success" | "error" | "info";

type Notification = {
    id: number;
    message: string;
    type: NotificationType;
};

type NotificationContextType = {
    notify: (message: string, type?: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const notify = (message: string, type: NotificationType = "info") => {
        const id = Date.now();

        setNotifications((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter(n => n.id !== id));
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}

            {/* CONTENEDOR DE TOASTS */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map(n => (
                <div
                key={n.id}
                className={`px-4 py-3 rounded-md shadow text-sm text-white
                    ${n.type === "success" && "bg-green-600"}
                    ${n.type === "error" && "bg-red-600"}
                    ${n.type === "info" && "bg-blue-600"}
                `}
                >
                {n.message}
                </div>
            ))}
            </div>
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const ctx = useContext(NotificationContext);
    if (!ctx) {
        throw new Error("useNotification must be used inside NotificationProvider");
    }
    return ctx;
}
