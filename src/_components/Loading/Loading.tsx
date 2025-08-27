import { FC } from "react";
import { Loader2 } from "lucide-react";

const Loading: FC = () => (
	<div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
		<Loader2 className="animate-spin" size={40} />
	</div>
);

export default Loading;