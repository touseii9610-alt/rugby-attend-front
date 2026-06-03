function LoadingOverlay() {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/30
      "
    >
      <div
        className="
          rounded-3xl
          bg-white
          p-8
          text-center
          shadow-xl
        "
      >
        <div
          className="
            text-6xl
            animate-bounce
          "
        >
          🏉
        </div>

        <p
          className="
            mt-4
            text-lg
            font-black
            text-green-700
          "
        >
          Loading...
        </p>

        <p
          className="
            mt-2
            text-sm
            text-gray-500
          "
        >
          Preparing Rugby Event
        </p>
      </div>
    </div>
  );
}

export default LoadingOverlay;
