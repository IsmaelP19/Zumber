export default function Notification ({ message, type }) {
  if (message === null || message === '' || message === undefined) {
    return null
  }

  let style

  if (type === 'success') {
    style = 'bg-green-100 border-green-400 text-green-700'
  } else if (type === 'error') {
    style = 'bg-red-100 border-red-400 text-red-700'
  } else if (type === 'info') {
    style = 'bg-blue-100 border-blue-400 text-blue-700'
  }

  return (
    <div className={`items-center ${style} font-bold w-full md:w-4/5 lg:w-[820px] p-6 md:m-auto md:my-4 md:rounded-2xl `}>
      {message}
    </div>
  )
}