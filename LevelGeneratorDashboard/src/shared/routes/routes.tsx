import React from "react";
import hammerIcon from "@/shared/assets/icons/hammer.png";
// import scalesIcon from "@/shared/assets/icons/scales.png";
import flaskIcon from "@/shared/assets/icons/flask15.png"
import clipboardIcon from "@/shared/assets/icons/clipboard15.png"
import EditorPage from "@/pages/editor-page";
import ExperimentPage from "@/pages/experiment-page";
import QueuePage from "@/pages/queue-page/ui/QueuePage";

export const appRoutes = [
    {
        path: '/', element: <EditorPage/>,
        handle: {
            title: 'Редактор',
            icon: hammerIcon
        }
    },
    {
        path: 'experiment',element: <ExperimentPage/>,
        handle: {
            title: 'Тестирование',
            icon: flaskIcon
        }
    },
    {
        path: 'experiments', element: <QueuePage/>,
        handle: {
            title: 'Эксперименты',
            icon: clipboardIcon
        }
    }
]