/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon, XIcon } from '@heroicons/react/solid'

export default function MessageBar(props: any) {
    const color: string = props.type === 'error' ? 'red' : 'green';

    return (
        <div className={"rounded-md bg-" + color + "-500 p-4"}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <CheckCircleIcon className={"h-5 w-5 text-" + color + "-400"} aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className={"text-sm font-medium text-" + color + "-800"}>{props.message}</p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            type="button"
                            className={"inline-flex bg-" + color + "-50 rounded-md p-1.5 text-" + color + "-500 hover:bg-" + color + "-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-" + color + "-50 focus:ring-" + color + "-600"}
                        >
                            <span className="sr-only">Dismiss</span>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
