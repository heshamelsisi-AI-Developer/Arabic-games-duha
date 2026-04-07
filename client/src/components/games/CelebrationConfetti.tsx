export default function CelebrationConfetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute w-3 h-3 rounded-full bg-[#FFD93D] confetti-spark" style={{ left: '10%', top: '10%' }} />
      <span className="absolute w-3 h-3 rounded-full bg-[#4ECDC4] confetti-spark" style={{ left: '25%', top: '8%' }} />
      <span className="absolute w-3 h-3 rounded-full bg-[#FF6B5B] confetti-spark" style={{ left: '40%', top: '20%' }} />
      <span className="absolute w-3 h-3 rounded-full bg-[#B8A8FF] confetti-spark" style={{ left: '55%', top: '12%' }} />
      <span className="absolute w-3 h-3 rounded-full bg-[#FFD93D] confetti-spark" style={{ left: '70%', top: '18%' }} />
      <span className="absolute w-3 h-3 rounded-full bg-[#4ECDC4] confetti-spark" style={{ left: '85%', top: '10%' }} />
      <span className="absolute w-2 h-6 rounded-full bg-[#FF6B5B] confetti-spark" style={{ left: '20%', top: '30%' }} />
      <span className="absolute w-2 h-6 rounded-full bg-[#B8A8FF] confetti-spark" style={{ left: '35%', top: '26%' }} />
      <span className="absolute w-2 h-6 rounded-full bg-[#FFD93D] confetti-spark" style={{ left: '60%', top: '32%' }} />
    </div>
  );
}
