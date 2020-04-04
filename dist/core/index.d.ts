declare function usePosition(): {
    position: {
        x: number;
        y: number;
        z: number;
    };
};

declare const version = "0.0.1";

export { usePosition, version };
