"use client";

import { useState } from "react";

const services = [
  "Bridal Makeup",
  "Reception Makeup",
  "Engagement Makeup",
  "Party Makeup",
];

const branches = ["Anna Nagar", "OMR"];

type FormErrors = {
  name?: string;
  phone?: string;
  service?: string;
  branch?: string;
  date?: string;
  time?: string;
  location?: string;
};

export default function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [branch, setBranch] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must contain 10 digits.";
    }

    if (!service) {
      newErrors.service = "Please select a service.";
    }

    if (!branch) {
      newErrors.branch = "Please select a branch.";
    }

    if (!date) {
      newErrors.date = "Please select an event date.";
    }

    if (!time) {
      newErrors.time = "Please select an event time.";
    }

    if (!location.trim()) {
      newErrors.location = "Please enter the event location.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    console.log({
      name,
      phone,
      service,
      branch,
      date,
      time,
      location,
      notes,
    });
  };

  return (
    <section id="booking" className="bg-stone-50 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            Book With Us
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
            Book your appointment
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Tell us about your event and we&apos;ll get back to you with
            availability.
          </p>
        </div>

        <div className="mt-12 rounded-3xl bg-white p-8 shadow-sm md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name + Phone */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />

                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-900"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your phone number"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />

                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Service + Branch */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="service"
                  className="text-sm font-medium text-gray-900"
                >
                  Service
                </label>

                <select
                  id="service"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900"
                >
                  <option value="">Select a service</option>

                  {services.map((serviceName) => (
                    <option key={serviceName} value={serviceName}>
                      {serviceName}
                    </option>
                  ))}
                </select>

                {errors.service && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.service}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="branch"
                  className="text-sm font-medium text-gray-900"
                >
                  Branch
                </label>

                <select
                  id="branch"
                  value={branch}
                  onChange={(event) => setBranch(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900"
                >
                  <option value="">Select a branch</option>

                  {branches.map((branchName) => (
                    <option key={branchName} value={branchName}>
                      {branchName}
                    </option>
                  ))}
                </select>

                {errors.branch && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.branch}
                  </p>
                )}
              </div>
            </div>

            {/* Date + Time */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="date"
                  className="text-sm font-medium text-gray-900"
                >
                  Event Date
                </label>

                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />

                {errors.date && (
                  <p className="mt-2 text-sm text-red-600">{errors.date}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="text-sm font-medium text-gray-900"
                >
                  Event Time
                </label>

                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
                />

                {errors.time && (
                  <p className="mt-2 text-sm text-red-600">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="text-sm font-medium text-gray-900"
              >
                Event Location
              </label>

              <input
                id="location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Where will the event take place?"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />

              {errors.location && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.location}
                </p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="text-sm font-medium text-gray-900"
              >
                Additional Notes
              </label>

              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Tell us anything else we should know..."
                className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Request Booking
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}