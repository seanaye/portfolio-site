import { FC, useEffect, useRef, useState } from "react";
import load, { Cell, DxUniverse, InitOutput } from "../wasm";

function debounce(func: () => void, timeout = 300){
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, timeout);
  };
}

function getSize() {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  return { width, height };
}

const colours = [
  {
    value: 0,
    color: "#83A598",
  },
  {
    value: 1,
    color: "#81A296",
  },
  {
    value: 2,
    color: "#7FA094",
  },
  {
    value: 3,
    color: "#7E9E92",
  },
  {
    value: 4,
    color: "#7C9C90",
  },
  {
    value: 5,
    color: "#7B9A8E",
  },
  {
    value: 6,
    color: "#79988C",
  },
  {
    value: 7,
    color: "#78968A",
  },
  {
    value: 8,
    color: "#769388",
  },
  {
    value: 9,
    color: "#759186",
  },
  {
    value: 10,
    color: "#738F85",
  },
  {
    value: 11,
    color: "#728D83",
  },
  {
    value: 12,
    color: "#708B81",
  },
  {
    value: 13,
    color: "#6E897F",
  },
  {
    value: 14,
    color: "#6D877D",
  },
  {
    value: 15,
    color: "#6B847B",
  },
  {
    value: 16,
    color: "#6A8279",
  },
  {
    value: 17,
    color: "#688077",
  },
  {
    value: 18,
    color: "#677E75",
  },
  {
    value: 19,
    color: "#657C73",
  },
  {
    value: 20,
    color: "#647A72",
  },
  {
    value: 21,
    color: "#627870",
  },
  {
    value: 22,
    color: "#61766E",
  },
  {
    value: 23,
    color: "#5F736C",
  },
  {
    value: 24,
    color: "#5D716A",
  },
  {
    value: 25,
    color: "#5C6F68",
  },
  {
    value: 26,
    color: "#5A6D66",
  },
  {
    value: 27,
    color: "#596B64",
  },
  {
    value: 28,
    color: "#576962",
  },
  {
    value: 29,
    color: "#566760",
  },
  {
    value: 30,
    color: "#54645F",
  },
  {
    value: 31,
    color: "#53625D",
  },
  {
    value: 32,
    color: "#51605B",
  },
  {
    value: 33,
    color: "#505E59",
  },
  {
    value: 34,
    color: "#4E5C57",
  },
  {
    value: 35,
    color: "#4D5A55",
  },
  {
    value: 36,
    color: "#4B5853",
  },
  {
    value: 37,
    color: "#495551",
  },
  {
    value: 38,
    color: "#48534F",
  },
  {
    value: 39,
    color: "#46514D",
  },
  {
    value: 40,
    color: "#454F4C",
  },
  {
    value: 41,
    color: "#434D4A",
  },
  {
    value: 42,
    color: "#424B48",
  },
  {
    value: 43,
    color: "#404946",
  },
  {
    value: 44,
    color: "#3F4744",
  },
  {
    value: 45,
    color: "#3D4442",
  },
  {
    value: 46,
    color: "#3C4240",
  },
  {
    value: 47,
    color: "#3A403E",
  },
  {
    value: 48,
    color: "#383E3C",
  },
  {
    value: 49,
    color: "#373C3A",
  },
  {
    value: 50,
    color: "#353A39",
  },
  {
    value: 51,
    color: "#343837",
  },
  {
    value: 52,
    color: "#323535",
  },
  {
    value: 53,
    color: "#313333",
  },
  {
    value: 54,
    color: "#2F3131",
  },
  {
    value: 55,
    color: "#2E2F2F",
  },
  {
    value: 56,
    color: "#2C2D2D",
  },
  {
    value: 57,
    color: "#2B2B2B",
  },
  {
    value: 58,
    color: "#292929",
  },
  {
    value: 59,
    color: "#282728",
  },
].reverse();

function mapTo(num: number) {
  return colours[num].color
}

const pxPerCell = 8;

export const GameOfLifeCanvas: FC = () => {
  const [mod, setMod] = useState<InitOutput | null>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    (async () => {
      const res = await fetch("wasm_bg.wasm");
      const wasm = await load(res);
      setMod(wasm);
    })();

    const resizeHandler = debounce(() => {
      const { width: newWidth, height: newHeight } = getSize();
      const calcWidth = Math.floor(newWidth / 8);
      const calcHeight = Math.floor(newHeight / 8);
      setWidth(calcWidth);
      setHeight(calcHeight);
    }, 500)

    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const dxUniverse = useRef<DxUniverse | null>(null);

  useEffect(() => {
    if (!mod || !canvasRef.current) return;
    if (dxUniverse.current) dxUniverse.current.free();

    dxUniverse.current = DxUniverse.new(width, height);

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const draw = (ctx: CanvasRenderingContext2D) => {
      if (!dxUniverse.current || !mod) return;
      dxUniverse.current.tick();

      const cellsPtr = dxUniverse.current.cells();
      const cells = new Uint8Array(mod.memory.buffer, cellsPtr, width * height);

      ctx.beginPath();

      for (let row = 0; row < height; row += 1) {
        for (let col = 0; col < width; col += 1) {
          const idx = row * width + col;
          ctx.fillStyle = mapTo(cells[idx])

          ctx.fillRect(
            col * pxPerCell + 1,
            row * pxPerCell + 1,
            pxPerCell,
            pxPerCell
          );
        }
      }

      ctx.stroke();
    };

    const renderLoop = () => {
      draw(ctx);
      requestAnimationFrame(renderLoop);
    };

    const handleMouse = (e: MouseEvent) => {
      const w = Math.floor(e.clientY / pxPerCell)
      const h = Math.floor(e.clientX / pxPerCell)

      dxUniverse.current?.set_cell(w, h, Cell.Alive)
    }
    window.addEventListener("mousemove", handleMouse)
    const loopId = requestAnimationFrame(renderLoop);
    return () => {
      cancelAnimationFrame(loopId);
      window.removeEventListener("mousemove", handleMouse)
    };
  }, [mod, width, height]);

  const canvasRef = useRef<null | HTMLCanvasElement>(null);


  if (!dxUniverse) {
    return <div>loading...</div>;
  }
  return (
    <canvas
      className="absolute w-screen h-screen top-0 left-0 -z-50"
      width={pxPerCell * width}
      height={pxPerCell * height}
      ref={canvasRef}
    />
  );
};
