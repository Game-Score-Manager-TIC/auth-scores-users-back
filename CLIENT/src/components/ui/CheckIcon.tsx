
interface CheckIconProps {
    size?: number;
    height?: number;
    width?: number;
    className?: string;
}


export const CheckIcon = ({
    size,
    height,
    width,
    ...className
}: CheckIconProps) => {
    return (
        <svg
            width={size || width || 18}
            height={size || height || 18}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...className}
        >
            <path
                d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};