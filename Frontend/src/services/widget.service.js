import { getHitShapeOnCanvasPointerDown } from "tldraw";
import { apiFetch } from "./api";

export const WidgetService = {
    async putRequest(
        widgetId,
        accessToken,
        gridName,
        width,
        height,
        xPosition,
        yPosition,
    ) {
        const endpoint = "/widget";

        return await apiFetch(endpoint, {
            method: "PUT",
            accessToken: accessToken,
            body: {
                widgetId: widgetId,
                gridName: gridName,
                width: width,
                height: height,
                xPosition: xPosition,
                yPosition: yPosition,
            }
        });
    },

    async getRequest(gridName, accessToken) {
        const params = new URLSearchParams({
            gridName: gridName,
        });

        const url = "/widget?" + params;

        return await apiFetch(url, { 
            accessToken: accessToken
        });
    },

    async postPomodoroRequest(widgetId, gridName, pomodoroWorkTime, pomodoroBreakTime, xPosition, yPosition, accessToken) {
        const url = "/widget/pomodoro";

        return await apiFetch(url, {
            method: "POST",
            accessToken: accessToken,
            body: {
                widgetId: widgetId,
                gridName: gridName,
                pomodoroWorkTime: pomodoroWorkTime,
                pomodoroBreakTime: pomodoroBreakTime,
                xPosition: xPosition,
                yPosition: yPosition
            },
        });
    },

    async deleteRequest(widgetId, gridName, accessToken) {
        const url = "/widget";

        return await apiFetch(url, {
            method: "DELETE",
            accessToken: accessToken,
            body: {
                widgetId: widgetId,
                gridName: gridName,
            }
        });

    },

    async deleteAllRequest(gridName, accessToken) {
        const url = "/widget/all";

        return await apiFetch(url, {
            method: "DELETE",
            accessToken: accessToken,
            body: {
                gridName: gridName,
            }
        });
    },

    async putPomodoroRequest(newPomodoroWorkTime, newPomodoroBreakTime, accessToken, gridName, widgetId) {
        const url = "/widget/pomodoro/time";

        return await apiFetch(url, {
            method: "PUT",
            accessToken: accessToken,
            body: {
                gridName: gridName,
                widgetId: widgetId,
                newPomodoroWorkTime: newPomodoroWorkTime,
                newPomodoroBreakTime: newPomodoroBreakTime
            }
        })
    },

    async putListRequest(newListName, accessToken, gridName, widgetId) {
        const url = "/widget/list/name";

        return await apiFetch(url, {
            method: "PUT",
            accessToken: accessToken,
            body: {
                gridName: gridName,
                widgetId: widgetId,
                newListName: newListName
            }
        })
    },

    async putNoteDescriptionRequest(gridName, widgetId, newNoteDescription, accessToken) {
        const url = "/widget/note/description"

        return await apiFetch(url, {
            method: "PUT",
            accessToken: accessToken,
            body: {
                gridName: gridName,
                widgetId: widgetId,
                newNoteDescription: newNoteDescription
            }
        });
    },

    async putNoteNameRequest(newNoteName, accessToken, gridName, widgetId) {
        const url = "/widget/note/name";

        return await apiFetch(url, {
            method: "PUT",
            accessToken: accessToken,
            body: {
                gridName: gridName,
                widgetId: widgetId,
                newNoteName: newNoteName
            }
        })
    },

    async postListRequest(gridName, widgetId, listName, xPosition, yPosition, accessToken) {
        const url = "/widget/list";

        return await apiFetch(url, {
            method: "POST",
            accessToken: accessToken,
            body: {
                gridName: gridName,
                widgetId: widgetId,
                listName: listName,
                xPosition: xPosition,
                yPosition: yPosition
            }
        })

    },

    async postNoteRequest(gridName, widgetId, noteName, xPosition, yPosition, accessToken) {
        const url = "/widget/note";

        return await apiFetch(url, {
            method: "POST",
            accessToken: accessToken,
            body: {
                gridName: gridName,
                widgetId: widgetId,
                noteName: noteName,
                xPosition: xPosition,
                yPosition: yPosition
            }
        })
    }
};
