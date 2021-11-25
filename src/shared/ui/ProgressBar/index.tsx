import { FC } from "react";

export type ProgressSteps = {
  step: number;
  percent: number;
  currentStep: any;
};

type Props = {
  steps: ProgressSteps[];
  onChangeStep: (step: any) => void;
};

const ProgressBar: FC<Props> = ({ steps, onChangeStep }) => {
  return (
    <div className="w-full">
      <div className="flex justify-center">
        {steps?.map((step) => (
          <Progress
            step={step}
            isFirst={step.step === 0}
            key={step.step}
            onChangeStep={onChangeStep}
          />
        ))}
      </div>
    </div>
  );
};

const Progress: FC<{
  step: ProgressSteps;
  isFirst: boolean;
  onChangeStep: Props["onChangeStep"];
}> = ({ step, isFirst, onChangeStep }) => {
  const isDone =
    step.currentStep >= step.step || step.step === step.currentStep;
  const active = isDone ? "bg-indigo-500" : "bg-white";
  return (
    <div className="w-1/4">
      <div className="relative mb-2">
        {!isFirst && (
          <div
            className="absolute flex align-center items-center align-middle content-center"
            style={{
              width: "calc(100% - 2.5rem - 1rem)",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
              <div
                className="w-0 bg-indigo-500 py-1 rounded"
                style={{ width: `${isDone ? 100 : step.percent}%` }}
              ></div>
            </div>
          </div>
        )}

        <div
          className={`w-4 h-4 mx-auto ${active} border-2 border-gray-200 rounded-full text-lg text-white flex items-center cursor-pointer`}
          onClick={() => onChangeStep(step.step)}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
