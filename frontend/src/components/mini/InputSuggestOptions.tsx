import { useState } from "react";
import dropdown from '../../assets/dropdown.png'
import cancel from '../../assets/cancel.png';
const options: string[] = ["Apple", "Boy", "Cat", "Dog", "zeep"];
interface Types {
    placeholder?: string,
    id?: string,
}

export default function InputSuggestOptions({ placeholder, id }: Types) {
    const [option, setOptions] = useState<string[]>(options);
    const [text, setText] = useState<string>("");
    const [showAll, setShowAll] = useState<boolean>(false);
    const [selected, setSelected] = useState<string[]>([]);
    let isFind: boolean = false;

    return (
        <div className="relative w-full ">
            <div className="p-2 flex flex-wrap gap-2">
                {
                    selected && selected?.map((e: string, i: number) => (
                        <div key={i} className="bg-gray-100 px-3 py-1 w-fit  rounded-full text-black
                        flex flex-row flex-nowrap items-center justify-between gap-2">
                            <p>
                                {e}
                            </p>
                            <img src={cancel.src} className="size-6" alt='cancel icon'></img>
                        </div>
                    ))
                }
            </div>
            <div className="trans-to-white group flex flex-row items-center justify-center rounded-full  p-0">

                <input
                    type="text "
                    name=""
                    placeholder={placeholder}
                    id={id}
                    className={` bg-transparent w-full h-full  !border-0 outline-none px-4 py-3 rounded-full group-hover:placeholder-transition
                        `}
                    onChange={(e) => {
                        const str: string = (e.target.value);
                        setText(str);
                        showAll ? setShowAll(!showAll) : null;
                    }}

                />
                <div className={`trans-to-white flex justify-center items-center !border-0 w-auto !bg-gray-200 px-4 py-3 rounded-r-full
                    `}>
                    <button className=""
                        onClick={() => setShowAll(!showAll)}>
                        <img className={`size-8 smooth ${showAll ? 'rotate-180' : 'rotate-0'}`} src={dropdown.src} alt="icon" />
                    </button>
                </div>
            </div>
            <div className="absolute rounded-md w-full mt-1">
                {
                    option && option?.map((e: string, i: number) => {
                        let isMatch: boolean = (e.match(text) && text.length > 0) || false;
                        //Show No Result found
                        if (!isFind) {
                            isFind = isMatch;
                        }

                        return isMatch || showAll ?
                            <p
                                key={i}
                                className="text-xl bg-white text-black p-2 px-4 
                            hover:bg-blue-400   hover:cursor-pointer smooth
                             odd:bg-gray-100 first-of-type:rounded-t-md last-of-type:rounded-l-md"
                                onClick={(e) => {
                                    const str: string = e.currentTarget.innerText;
                                    setSelected([...selected, str])
                                }}
                            >
                                {e} {options.length} {i+1}
                            </p>
                            : (isFind && option.length == i+1) ?
                                <p
                                    key={i}
                                    className="text-xl bg-white text-black p-2 px-4 
                            hover:bg-blue-400   hover:cursor-pointer smooth
                             odd:bg-gray-100 first-of-type:rounded-t-md last-of-type:rounded-l-md"
                                >No Result</p>
                                : null
                    })
                }
            </div>
        </div>
    )
}


