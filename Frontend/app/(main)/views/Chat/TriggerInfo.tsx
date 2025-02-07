import { Flex } from '@/ui/primitives/Flex'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import robot from '@/assets/robot.svg'

interface TriggerInfoProps {
	triggerInfo: {
		action: string
		token_name: string
		token_amount: number
		analysis: string
		created_time: string
		amount: number
	}
}

export const TriggerInfo = ({ triggerInfo }: TriggerInfoProps) => {
	return (
		<Flex className="self-start flex-col text-white p-4 rounded-lg w-[85%] max-w-96 min-w-[300px] bg-ppGray800 gap-2" style={{ minWidth: '100%' }}>
			<Flex className="self-start flex text-white p-3 pl-0 justify-start rounded-lg w-[85%] max-w-96 items-center gap-3">
				<span className="flex-shrink-0 w-[30px] h-[30px] flex justify-center items-center bg-ppGray400 rounded-full">
					<Image src={robot} alt="robot" width={20} height={20} className="w-auto h-auto" />
				</span>
				<span className="text-[14px] flex items-center gap-2" style={{ background: 'linear-gradient(to right, #D5F903, #03EDF9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
					Agent PP Decided to:
				</span>
			</Flex>
			<div className="flex w-full justify-between">
				<div>
					<span className="text-[20px] text-white">{triggerInfo.action}</span>
					<div className="text-[12px] text-[#00FF0A]">
						{' '}
						{triggerInfo.token_amount ? `+${triggerInfo.token_amount} ${triggerInfo.token_name}` : `${triggerInfo.token_name}`}
						{triggerInfo.token_amount && <div className="text-[12px] text-[#00FF0A] flex items-end gap-1">{triggerInfo.amount > 0 && <div className="text-[12px] text-[#d6d6d6]">-{triggerInfo.amount}SOL</div>}</div>}
						<div className="text-[10px] text-[#676766]">{formatDistanceToNow(triggerInfo.created_time)} ago</div>
					</div>

					{/* {order.last_checked_time && (
															<div className="text-[10px] text-[#676766]">
																{Math.floor((100 * order.request_data.amount) / Math.pow(10, Number(order.request_type == 'Bottom Blaster' || order.request_type == 'Potatoe Agent' ? 9 : order.request_data.decimals))) / 100} {order.token_name}
															</div>
														)} */}
				</div>
				<div className="text-right">{/* <div className="text-[14px] text-[#00FF0A]">+{Math.floor((1000 * Math.abs(Number(order.request_data.target) - Number(order.request_data.finalPrice))) / Number(order.request_data.target)) / 10}% AI Bonus</div> */}</div>
			</div>

			<p className="text-sm text-ppGray200">
				<div className="text-[12px] text-white text-left justify-start">Reason</div>

				{triggerInfo.analysis}
			</p>
			{/* <span className="text-xs text-ppGray400">{formatDistanceToNow(triggerInfo.created_time)}</span> */}
		</Flex>
	)
}
