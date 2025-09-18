import noIdeal from "../assets/no-ideal.jpg";

export function EmptyState({}: { title: string }) {
    return (
        <div className="box p-10 empty bg-white flex flex-col items-center text-center">
            <img src={noIdeal} alt="Empty" className="w-128 h-128 object-contain mb-6 opacity-80" />
            {/* <div className="text-2xl font-bold mb-2">{title}</div> */}
            <p className="text-slate-500">No content yet. This page is a stub waiting for real data.</p>
        </div>
    );
}

export default EmptyState;
