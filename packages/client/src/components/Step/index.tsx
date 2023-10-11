const Step = ({current, steps}:{current:number, steps: any[]}) => {

  return (
    <ul className="steps">
      {steps.map((step, index) => (
        <li className={`step w-40 ${current >= index && "step-success"}`}>{step.title}</li>
      ))}
    </ul>
    )
}

export default Step