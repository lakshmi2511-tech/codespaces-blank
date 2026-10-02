"use client";

import { useState } from "react";

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!service) {
      newErrors.service = "Please select a service.";
    }

    if (!branch) {
      newErrors.branch = "Please select a branch.";
    }

    if (!date) {
      newErrors.date = "Please select a date.";
    }

    if (!time) {
      newErrors.time = "Please select a time.";
    }

    if (!location.trim()) {
      newErrors.location = "Event location is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    console.log("SUBMIT HANDLER CALLED");

    setApiError("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      setIsLoading(true);

      console.log("SENDING BOOKING TO API");

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          service,
          branch,
          date,
          time,
          location,
          notes,
        }),
      });

      const data = await response.json();

      console.log("API RESPONSE:", data);

      if (!response.ok) {
        setApiError(
          data.message ||
            "Something went wrong while creating the booking."
        );
        return;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit booking:", error);

      setApiError(
        "Unable to submit your booking. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewBooking = () => {
    setName("");
    setPhone("");
    setService("");
    setBranch("");
    setDate("");
    setTime("");
    setLocation("");
    setNotes("");
    setErrors({});
    setApiError("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="bg-stone-50 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
              ✓
            </div>

            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Booking Request Received
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
              Thank you, {name}. Your booking request has been
              submitted successfully. Our team will review the
              availability and contact you shortly.
            </p>

            <button
              type="button"
              onClick={handleNewBooking}
              className="mt-8 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Make Another Booking
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="bg-stone-50 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            Book With Us
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
            Plan your special day
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Tell us about your event and our team will review your
            booking request.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-3xl bg-white p-8 shadow-sm md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900"
              >
                Name *
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-900"
              >
                Phone *
              </label>

              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="10-digit phone number"
                maxLength={10}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Service */}
            <div>
              <label
                htmlFor="service"
                className="text-sm font-medium text-gray-900"
              >
                Service *
              </label>

              <select
                id="service"
                value={service}
                onChange={(event) => setService(event.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
              >
                <option value="">Select a service</option>
                <option value="Bridal Makeup">
                  Bridal Makeup
                </option>
                <option value="Reception Makeup">
                  Reception Makeup
                </option>
                <option value="Engagement Makeup">
                  Engagement Makeup
                </option>
                <option value="Party Makeup">
                  Party Makeup
                </option>
              </select>

              {errors.service && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.service}
                </p>
              )}
            </div>

            {/* Branch */}
            <div>
              <label
                htmlFor="branch"
                className="text-sm font-medium text-gray-900"
              >
                Branch *
              </label>

              <select
                id="branch"
                value={branch}
                onChange={(event) => setBranch(event.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
              >
                <option value="">Select a branch</option>
                <option value="Anna Nagar">Anna Nagar</option>
                <option value="OMR">OMR</option>
              </select>

              {errors.branch && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.branch}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="text-sm font-medium text-gray-900"
              >
                Event Date *
              </label>

              <input
                id="date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
              />

              {errors.date && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.date}
                </p>
              )}
            </div>

            {/* Time */}
            <div>
              <label
                htmlFor="time"
                className="text-sm font-medium text-gray-900"
              >
                Event Time *
              </label>

              <input
                id="time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
              />

              {errors.time && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.time}
                </p>
              )}
            </div>

            {/* Event Location */}
            <div className="md:col-span-2">
              <label
                htmlFor="location"
                className="text-sm font-medium text-gray-900"
              >
                Event Location *
              </label>

              <input
                id="location"
                type="text"
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                placeholder="Example: Anna Nagar, Chennai"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              />

              {errors.location && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label
                htmlFor="notes"
                className="text-sm font-medium text-gray-900"
              >
                Additional Notes
              </label>

              <textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Anything else we should know?"
                rows={4}
                className="mt-2 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {apiError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-8 w-full rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading
              ? "Submitting..."
              : "Submit Booking Request"}
          </button>
        </form>
      </div>
    </section>
  );
}