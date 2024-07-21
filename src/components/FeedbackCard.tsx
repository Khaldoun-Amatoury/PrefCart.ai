type FeedbackCardProps = {
  fullName: string;
  message: string;
};

export function FeedbackCard({ fullName, message }: FeedbackCardProps) {
  return (
    <div className="p-6 bg-black hover:bg-customRed rounded-lg md:p-8">
      <p className="leading-loose text-white ">{message}</p>
      <div className="flex items-center mt-6">
        <div className="mx-4">
          <h1 className="font-semibold text-white">{fullName}</h1>
        </div>
      </div>
    </div>
  );
}
