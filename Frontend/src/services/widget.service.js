import { getHitShapeOnCanvasPointerDown } from "tldraw";
import { apiFetch } from "./api";

export const WidgetService = {
    async putRequest(
        widgetId,
        username,
        gridName,
        width,
        height,
        xPosition,
        yPosition,
    ) {
        const endpoint = "/widget";

        try {
            const res = await apiFetch(endpoint, {
                method: "PUT",
                body: JSON.stringify({
                    widgetId: widgetId,
                    username: username,
                    gridName: gridName,
                    width: width,
                    height: height,
                    xPosition: xPosition,
                    yPosition: yPosition,
                }),
            });

            return res;
        } catch (err) {
            console.log("deu ruim");
        }
    },

    async getRequest(username, gridName) {
        const params = new URLSearchParams({
            username: username,
            gridName: gridName,
        });

        const url = "/widget?" + params;

        try {
            const res = await apiFetch(url, { method: "GET" });

            // const jsResponse = await res.json();

            return res.data;
        } catch (err) {
            console.log("deu ruimm");
        }
    },

    async postPomodoroRequest(widgetId, username, gridName, pomodoroWorkTime, pomodoroBreakTime, xPosition, yPosition) {
        const url = "/widget/pomodoro";

        try {
            const res = await apiFetch(url, {
                method: "POST",
                body: JSON.stringify({
                    widgetId: widgetId,
                    username: username,
                    gridName: gridName,
                    gridName: gridName,
                    pomodoroWorkTime: pomodoroWorkTime,
                    pomodoroBreakTime: pomodoroBreakTime,
                    xPosition: xPosition,
                    yPosition: yPosition
                }),
            });

            return res;
        } catch (err) {
            console.log("deu ruim");
        }
    },

    async deleteRequest(widgetId, username, gridName) {
        const url = "/widget";

        try {
            const res = await apiFetch(url, {
                method: "DELETE",
                body: JSON.stringify({
                    widgetId: widgetId,
                    username: username,
                    gridName: gridName,
                }),
            });

            return res;
        } catch (err) {
            console.log("deu ruim");
        }
    },

    async deleteAllRequest(username, gridName) {
        const url = "/widget/all";

        try {
            const res = await apiFetch(url, {
                method: "DELETE",
                body: JSON.stringify({
                    username: username,
                    gridName: gridName,
                }),
            });

            return res;
        } catch (err) {
            console.log(err);
        }
    },

    async putPomodoroRequest(newPomodoroWorkTime, newPomodoroBreakTime, username, gridName, widgetId) {
        const url = "/widget/pomodoro/time";

        try {
            const res = await apiFetch(url, {
                method: "PUT",
                body: JSON.stringify({
                    username: username,
                    gridName: gridName,
                    widgetId: widgetId,
                    newPomodoroWorkTime: newPomodoroWorkTime,
                    newPomodoroBreakTime: newPomodoroBreakTime
                })
            })

            return res;
        } catch(err) {
            return err;
        }
    },

    async putListRequest(newListName, username, gridName, widgetId) {
        const url = "/widget/list/name";

        try {
            const res = await apiFetch(url, {
                method: "PUT",
                body: JSON.stringify({
                    username: username,
                    gridName: gridName,
                    widgetId: widgetId,
                    newListName: newListName
                })
            })

            return res;
        } catch(err) {
            return err;
        }
    },

    async putNoteDescriptionRequest(username, gridName, widgetId, newNoteDescription) {
        const url = "/widget/note/description"

        try {
            const res = await apiFetch(url, {
                method: "PUT",
                body: JSON.stringify({
                    username: username,
                    gridName: gridName,
                    widgetId: widgetId,
                    newNoteDescription: newNoteDescription
                })
            });

            return res;
        } catch(err) {
            return err;
        }
    },

    async putNoteNameRequest(newNoteName, username, gridName, widgetId) {
        const url = "/widget/note/name";

        try {
            const res = await apiFetch(url, {
                method: "PUT",
                body: JSON.stringify({
                    username: username,
                    gridName: gridName,
                    widgetId: widgetId,
                    newNoteName: newNoteName
                })
            })

            return res;
        } catch(err) {
            return err;
        }
    },

    async postListRequest(username, gridName, widgetId, listName, xPosition, yPosition) {
        const url = "/widget/list";

        try {
            const res = await apiFetch(url, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    gridName: gridName,
                    widgetId: widgetId,
                    listName: listName,
                    xPosition: xPosition,
                    yPosition: yPosition
                })
            })

            return res;
        } catch(err) {
            return err;
        }
    },

    async postNoteRequest(username, gridName, widgetId, noteName, xPosition, yPosition) {
        const url = "/widget/note";

        try {
            const res = await apiFetch(url, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    gridName: gridName,
                    widgetId: widgetId,
                    noteName: noteName,
                    xPosition: xPosition,
                    yPosition: yPosition
                })
            })

            return res;
        } catch(err) {
            return err;
        }
    }
};
